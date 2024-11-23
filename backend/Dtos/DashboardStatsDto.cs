namespace HackaTuLuWonderland.Persistence;

public class DashboardStatsDto {
    public int DirectAffectedSystemsCount { get; set; }
    public int DirectAffectedApplicationsCount { get; set; }
    public int DirectAffectedServicesCount { get; set; }
    public int DirectAffectedNetworksCount { get; set; }
    
    public Dictionary<string, int> SystemsCountPerCriticalAndConsistency { get; set; } = [];
    public Dictionary<string, int> SystemCountPerType { get; set; } = [];
    public Dictionary<string, int> SystemCountPerNetworkStatus { get; set; } = [];
    
    public int DirectAffectedITResponsibles { get; set; }
    public int DirectAffectedUsers { get; set; }
    public int DirectAffectedServiceOwners { get; set; }
    public int DirectAffectedOUs { get; set; }
    public int DirectAffectedCountries { get; set; }
    public int DirectAffectedLocations { get; set; }

    public Dictionary<string, int> DirectSystemCountPerType { get; set; } = [];
    public Dictionary<string, int> InDirectSystemCountPerType { get; set; } = [];

    public Dictionary<string, int> DirectApplicationCountPerCategory { get; set; } = [];
    public Dictionary<string, int> IndirectApplicationCountThroughService { get; set; } = [];

    public int AffectedITAdminCount { get; set; }
    public int IndirectAffectedSystemCountThroughITAdmin { get; set; }
}