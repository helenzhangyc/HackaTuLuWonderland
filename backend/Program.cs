using HackaTuLuWonderland.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<NeoClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/dashboard-stats", async (NeoClient client) =>
{
    var stats = new DashboardStatsDto();
    stats.DirectAffectedSystemsCount = await client.GetDirectAffectedSystemsCount();
    stats.DirectAffectedApplications = await client.GetDirectAffectedApplications;
    stats.DirectAffectedServicesCount = await client.GetDirectAffectedServicesCount();
    stats.DirectAffectedNetworksCount = await client.GetDirectAffectedNetworksCount();
    
    stats.SystemsCountPerCriticalAndConsistency = await client.GetSystemsCountPerCriticalAndConsistency();
    stats.SystemCountPerType = await client.GetSystemCountPerType();
    stats.SystemCountPerNetworkStatus = await client.GetSystemCountPerNetworkStatus();
    
    stats.DirectAffectedITResponsibles = await client.GetDirectAffectedITResponsibles();
    stats.DirectAffectedUsers = await client.GetDirectAffectedUsers();
    stats.DirectAffectedServiceOwners = await client.GetDirectAffectedServiceOwners();
    stats.DirectAffectedOUs = await client.GetDirectAffectedOUs();
    stats.DirectAffectedCountries = await client.GetDirectAffectedCountries();
    stats.DirectAffectedLocations = await client.GetDirectAffectedLocations();

    stats.DirectSystemCountPerType = await client.GetDirectSystemCountPerType();
    stats.InDirectSystemCountPerType = await client.GetInDirectSystemCountPerType();

    stats.DirectApplicationCountPerCategory = await client.GetDirectApplicationCountPerCategory();
    stats.IndirectApplicationCountThroughService = await client.GetIndirectApplicationCountThroughService();

    stats.AffectedITAdminCount = await client.GetAffectedITAdminCount();
    stats.IndirectAffectedSystemCountThroughITAdmin = await client.IndirectAffectedSystemCountThroughITAdmin();

    return stats;
})
.WithName("Dashboard Stats");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
