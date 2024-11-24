using Neo4j.Driver;

namespace HackaTuLuWonderland.Persistence;

public class NeoClient {

    private readonly string _uri;
    private readonly string _username;
    private readonly string _password;

    private readonly IDriver _driver;
    public NeoClient(IConfiguration configuration)
    {
        _uri = configuration["DB_URI"];
        _username = configuration["DB_USERNAME"];
        _password = configuration["DB_PASSWORD"];

        _driver = GraphDatabase.Driver(_uri, AuthTokens.Basic(_username, _password));
    }

    private readonly string docker_filter = @" ((
                si.product = ""Docker"" AND
                si.version >= ""23.0"" AND
                si.version <= ""26.1.3""
                ) OR
                (
                si.product = ""Docker CLI"" AND
                si.version >= ""23.0"" AND
                si.version <= ""26.1.3""
                ) OR
                (
                si.product = ""Docker Desktop"" AND
                si.version >= ""4.10.1"" AND
                si.version <= ""4.34.2""
                )) ";

    public async Task<int> GetDirectAffectedSystemsCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter + "RETURN COUNT(sys);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
    public async Task<int> GetDirectAffectedApplicationsCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (app:Application)-[:runs_on]-(sys)
                RETURN COUNT(distinct app);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

    public async Task<int> GetDirectAffectedServicesCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (app:Application)-[:runs_on]-(sys)
                MATCH (app)-[:serves] - (ser:Service)
                RETURN COUNT(distinct ser.name);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

    public async Task<int> GetDirectAffectedNetworksCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)-[:in_segment]-(vns:VirtualNetworkSegment)
                RETURN COUNT(DISTINCT vns);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

    
    public async Task<Dictionary<string, int>> GetSystemsCountPerCriticalAndConsistency(){
        await using var session = _driver.AsyncSession();

        var critical_active = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"and sys.critical = 1
                    and sys.state = ""Active""
                    RETURN count(sys);");

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        var critical_inconsistent = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"and sys.critical = 1
                    and sys.state = ""Inconsistent""
                    RETURN count(sys);");

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        var uncritical_active = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"and sys.critical = 0
                    and sys.state = ""Active""
                    RETURN count(sys);");

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        var uncritical_inconsistent = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"and sys.critical = 0
                    and sys.state = ""Inconsistent""
                    RETURN count(sys);");

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        return new Dictionary<string, int>{
            {"Critical & Active", critical_active},
            {"Critical & InConsistent", critical_inconsistent},
            {"UnCritical & Active", uncritical_active},
            {"UnCritical & InConsistent", uncritical_inconsistent}
        };
    }

    public async Task<Dictionary<string, int>> GetSystemCountPerType(){
        await using var session = _driver.AsyncSession();
        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"RETURN sys.type AS type, COUNT(sys) AS systemCount
                ORDER BY systemCount DESC;");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }

    public async Task<Dictionary<string, int>> GetSystemCountPerNetworkStatus(){
        await using var session = _driver.AsyncSession();
        var offlinesystems = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"WITH COLLECT(DISTINCT sys) AS allSystems

                // Second query: Systems matching software criteria and having related IP addresses
                MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)
                WITH allSystems, COLLECT(DISTINCT sys) AS systemsWithIP

                // Compute relative complement: Systems without related IPs
                WITH [sys IN allSystems WHERE NOT sys IN systemsWithIP] AS complementSystems
                UNWIND complementSystems AS sys
                RETURN COUNT(DISTINCT sys)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });

        var onlinesystems = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys) -[:related_ipaddress] - (ip:IPAddress)
                RETURN count( DISTINCT sys)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });

        return new Dictionary<string, int>{
            { "Offline Systems", offlinesystems},
            { "Online Systems", onlinesystems}
        };
    }
    
    public async Task<int> GetDirectAffectedITResponsibles(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (asrole:AssignedSystemRole)-[:assigned_for]-(sys) where asrole.label = ""System Administrator"" or asrole.label = ""Security Coordinator"" or asrole.label = ""Cybersecurity Officer""
                MATCH (p:Person)-[:role_assigned]-(asrole) 
                RETURN count(distinct p.fullname);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
        
    public async Task<int> GetDirectAffectedUsers(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (p:Person) - [:role_assigned] - (aSysRole:AssignedSystemRole) - [:assigned_for] - (sys)
                RETURN count(distinct p);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
        
    public async Task<int> GetDirectAffectedServiceOwners(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (app:Application)-[:runs_on]-(sys)
                MATCH (app)-[:serves] - (ser:Service)
                MATCH (p)-[:role_assigned]-(aSerRole:AssignedServiceRole)-[:assigned_for]-(ser)
                RETURN COUNT(distinct p.fullname);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
            
    public async Task<int> GetDirectAffectedOUs(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)-[:in_segment]-(vns:VirtualNetworkSegment)-[:owned_by]-(org:OrgUnit)
                RETURN count( DISTINCT org);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

            
    public async Task<int> GetDirectAffectedCountries(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys)-[:in_country]-(ctry:Country)
                RETURN count(DISTINCT ctry);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

            
    public async Task<int> GetDirectAffectedLocations(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)-[:in_segment]-(VNS:VirtualNetworkSegment)-[:at_location]-(loc:Location)
                RETURN count(DISTINCT loc);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
    
    public async Task<Dictionary<string, int>> GetSystemCountPerSubType(){
        await using var session = _driver.AsyncSession();
        
        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"RETURN sys.sub_type AS type, COUNT(sys) AS systemCount
                ORDER BY systemCount DESC;");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }

    public async Task<Dictionary<string, int>> GetDirectSystemCountPerType(){
        await using var session = _driver.AsyncSession();
        
        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys) -[:related_ipaddress] - (ip:IPAddress)
                RETURN  sys.type, count(distinct sys)");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }

    public async Task<Dictionary<string, int>> GetInDirectSystemCountPerType(){
        await using var session = _driver.AsyncSession();
            return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (sys) -[:related_ipaddress] - (ip:IPAddress)-[:in_segment]-(vns:VirtualNetworkSegment)
                MATCH (indirectSys:System) - [:related_ipaddress] - (ip)
                where indirectSys <>sys
                RETURN  indirectSys.type, count(DISTINCT indirectSys)");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
        });
    }

    public async Task<Dictionary<string, int>> GetDirectApplicationCountPerCategory(){
        await using var session = _driver.AsyncSession();
        
        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (app:Application) - [:runs_on] - (sys)
                RETURN app.category AS cat, COUNT( distinct app) AS appCount
                ORDER BY appCount DESC;");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }
    
    internal async Task<Dictionary<string, int>> GetIndirectApplicationCountThroughService()
    {
        await using var session = _driver.AsyncSession();
        
        var standalone_app_relation = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (directApp:Application {category: ""Application (Standalone)""})-[:runs_on]-(sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (directApp) - [:serves] -> (ser:Service) <-[:serves]-(otherApp:Application) 
                where otherApp.category=""Functional Module (as part of a Standalone Application)""
                return COUNT(DISTINCT otherApp.category)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        var functional_module_relation = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (directApp:Application {category: ""Functional Module (as part of a Standalone Application)""})-[:runs_on]-(sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (directApp) - [:serves] -> (ser:Service) <-[:serves]-(otherApp:Application) 
                where otherApp.category=""Application (Standalone)""
                return COUNT(DISTINCT otherApp.category)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });
            
        var technology_relation = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (directApp:Application {category: ""Technology Platform""})-[:runs_on]-(sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (directApp) - [:serves] -> (ser:Service) <-[:serves]-(otherApp:Application) 
                where otherApp.category=""Application (built on a Platform)""
                return COUNT(DISTINCT otherApp.category)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });
                        
        var app_plattform_relation = await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (directApp:Application {category: ""Application (built on a Platform)""})-[:runs_on]-(sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (directApp) - [:serves] -> (ser:Service) <-[:serves]-(otherApp:Application) 
                where otherApp.category=""Technology Platform""
                return COUNT(DISTINCT otherApp.category)");

                var dict = new Dictionary<string, int>();

                var record = await result.SingleAsync();
                return record[0].As<int>();
            });

        return new Dictionary<string, int>{
            {"App / Plattform", app_plattform_relation + technology_relation},
            {"Standalone App / Module", functional_module_relation + standalone_app_relation}
        };
    }

    public async Task<int> GetAffectedITAdminCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (asrole:AssignedSystemRole)-[:assigned_for]-(sys) where asrole.label = ""System Administrator""
                MATCH (p:Person)-[:role_assigned]-(asrole) 
                RETURN count(distinct p.fullname);");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

    public async Task<int> GetIndirectAffectedSystemCountThroughITAdmin(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"MATCH (p:Person) - [:role_assigned]-(asr:AssignedSystemRole{label:""System Administrator""}) - [:assigned_for] - (sys)
                MATCH (p) - [:role_assigned]-(asr2:AssignedSystemRole{label:""System Administrator""}) - [:assigned_for] - (indirectSys:System)
                where indirectSys <>sys
                RETURN  count(DISTINCT indirectSys)");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }




    public async Task<int> GetIndirectDirectSystemsWhichAreInconsistentOrTypeUnknownCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (sys) - [:related_ipaddress] - (ip:IPAddress) - [:in_segment] - (VNS:VirtualNetworkSegment)
                match (indirectSys:System) - [:related_ipaddress] - (ip) - [:in_segment] - (VNS)
                where sys <> indirectSys
                    and (indirectSys.type = ""Unknown"" or indirectSys.state = ""Inconsistent"")
                return count(DISTINCT indirectSys)");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }

    public async Task<Dictionary<string, int>> GetIndirectAffectedSystemsCriticalCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (sys) - [:related_ipaddress] - (ip:IPAddress) - [:in_segment] - (VNS:VirtualNetworkSegment)
                match (indirectSys:System) - [:related_ipaddress] - (ip) - [:in_segment] - (VNS)
                where sys <> indirectSys
                    and indirectSys.critical = 1
                return indirectSys.type, count(DISTINCT indirectSys)");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }
    
    public async Task<Dictionary<string, int>> GetIndirectAffectedSystemsUnCriticalCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"match (sys) - [:related_ipaddress] - (ip:IPAddress) - [:in_segment] - (VNS:VirtualNetworkSegment)
                match (indirectSys:System) - [:related_ipaddress] - (ip) - [:in_segment] - (VNS)
                where sys <> indirectSys
                    and indirectSys.critical = 0
                return indirectSys.type,  count(DISTINCT indirectSys)");

                var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }
    
    public async Task<Dictionary<string, int>> GetDirectSystemsCriticalCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"and sys.critical = 1
                return sys.type, count(DISTINCT sys)");

                  var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }
    
    public async Task<Dictionary<string, int>> GetDirectSystemsUnCriticalCount(){
        await using var session = _driver.AsyncSession();

        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"and sys.critical = 0
                return sys.type, count(DISTINCT sys)");

                   var dict = new Dictionary<string, int>();

                var record = await result.ToListAsync();

                dict = record.Select(entry => KeyValuePair.Create(entry[0].As<string>(), entry[1].As<int>())).ToDictionary();
                return dict;
            });
    }

    public async Task<int> GetDirectSystemsWhichAreOfflineCount(){
        await using var session = _driver.AsyncSession();
        return await session.ExecuteWriteAsync(
            async tx =>
            {
                var result = await tx.RunAsync(
                @"MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE" + docker_filter +
                @"WITH COLLECT(DISTINCT sys) AS allSystems

                // Second query: Systems matching software criteria and having related IP addresses
                MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
                WHERE " + docker_filter +
                @"MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)
                WITH allSystems, COLLECT(DISTINCT sys) AS systemsWithIP

                // Compute relative complement: Systems without related IPs
                WITH [sys IN allSystems WHERE NOT sys IN systemsWithIP] AS complementSystems
                UNWIND complementSystems AS sys
                RETURN COUNT(DISTINCT sys)");

                var record = await result.SingleAsync();
                var count = record[0].As<int>();

                return count;
            });
    }
    
}