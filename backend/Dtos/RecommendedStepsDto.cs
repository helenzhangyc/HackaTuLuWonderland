namespace HackaTuLuWonderland.Persistence;

public class RecommendedStepsDto {
    public int DirectAffectedApplicationsCount { get; set; }

    public int DirectSystemsWhichAreOfflineCount { get; set; }

    public int IndirectDirectSystemsWhichAreInconsistentOrTypeUnknownCount { get; set; }

    public Dictionary<string, int> IndirectAffectedSystemsCriticalCount { get; set; } = [];

    public Dictionary<string, int> IndirectAffectedSystemsUnCriticalCount { get; set; } = [];
    public Dictionary<string, int> DirectSystemsCriticalCount { get; set; } = [];
    public Dictionary<string, int> DirectSystemsUnCriticalCount { get; set; } = [];
}