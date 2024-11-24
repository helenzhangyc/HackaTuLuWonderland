using HackaTuLuWonderland.Persistence;

namespace HackaTuLuWonderland.Application;

public class ReccomendationAppp {

    private readonly NeoClient _client;
    private readonly CachedData _cachedData;

    public ReccomendationAppp(NeoClient client, CachedData cachedData)
    {
        _client = client;
        _cachedData = cachedData;
    }

    public async Task Execute(){
        var stats = new RecommendedStepsDto();

        stats.DirectAffectedApplicationsCount = await _client.GetDirectAffectedApplicationsCount();
        stats.DirectSystemsWhichAreOfflineCount = await _client.GetDirectSystemsWhichAreOfflineCount();

        stats.IndirectDirectSystemsWhichAreInconsistentOrTypeUnknownCount = await _client.GetIndirectDirectSystemsWhichAreInconsistentOrTypeUnknownCount();
        stats.IndirectAffectedSystemsCriticalCount = await _client.GetIndirectAffectedSystemsCriticalCount();
        stats.IndirectAffectedSystemsUnCriticalCount = await _client.GetIndirectAffectedSystemsUnCriticalCount();
        stats.DirectSystemsCriticalCount = await _client.GetDirectSystemsCriticalCount();
        stats.DirectSystemsUnCriticalCount = await _client.GetDirectSystemsUnCriticalCount();
        
        _cachedData.RecommendedSteps = stats;
    }
}