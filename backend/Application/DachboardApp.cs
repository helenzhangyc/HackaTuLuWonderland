using HackaTuLuWonderland.Persistence;

namespace HackaTuLuWonderland.Application;

public class DashboardApp {

    private readonly NeoClient _client;
    private readonly CachedData _cachedData;

    public DashboardApp(NeoClient client, CachedData cachedData)
    {
        _client = client;
        _cachedData = cachedData;
    }

    public async Task Execute(){
        var stats = new DashboardStatsDto();
        stats.DirectAffectedSystemsCount = await _client.GetDirectAffectedSystemsCount();
        stats.DirectAffectedApplicationsCount = await _client.GetDirectAffectedApplicationsCount();
        stats.DirectAffectedServicesCount = await _client.GetDirectAffectedServicesCount();
        stats.DirectAffectedNetworksCount = await _client.GetDirectAffectedNetworksCount();
        
        stats.SystemsCountPerCriticalAndConsistency = await _client.GetSystemsCountPerCriticalAndConsistency();
        stats.SystemCountPerType = await _client.GetSystemCountPerType();
        stats.SystemCountPerNetworkStatus = await _client.GetSystemCountPerNetworkStatus();
        
        stats.DirectAffectedITResponsibles = await _client.GetDirectAffectedITResponsibles();
        stats.DirectAffectedUsers = await _client.GetDirectAffectedUsers();
        stats.DirectAffectedServiceOwners = await _client.GetDirectAffectedServiceOwners();
        stats.DirectAffectedOUs = await _client.GetDirectAffectedOUs();
        stats.DirectAffectedCountries = await _client.GetDirectAffectedCountries();
        stats.DirectAffectedLocations = await _client.GetDirectAffectedLocations();

        stats.DirectSystemCountPerType = await _client.GetDirectSystemCountPerType();
        stats.InDirectSystemCountPerType = await _client.GetInDirectSystemCountPerType();

        stats.DirectApplicationCountPerCategory = await _client.GetDirectApplicationCountPerCategory();
        stats.IndirectApplicationCountThroughService = await _client.GetIndirectApplicationCountThroughService();

        stats.AffectedITAdminCount = await _client.GetAffectedITAdminCount();
        stats.IndirectAffectedSystemCountThroughITAdmin = await _client.GetIndirectAffectedSystemCountThroughITAdmin();
        
        _cachedData.DashboardStats = stats;
    }
}