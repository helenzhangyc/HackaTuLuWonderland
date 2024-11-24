using HackaTuLuWonderland.Application;
using HackaTuLuWonderland.BackgrundWorker;
using HackaTuLuWonderland.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<NeoClient>();
builder.Services.AddSingleton<CachedData>();
builder.Services.AddSingleton<DashboardApp>();
builder.Services.AddSingleton<ReccomendationAppp>();

builder.Services.AddHostedService<MyBackgroundWorker>();

var app = builder.Build();

app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin()
    );

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/dashboard-stats", async (CachedData cachedData) =>
{
    return cachedData.DashboardStats;
})
.WithName("Dashboard Stats");

app.MapGet("/recommended-steps", async (CachedData cachedData) =>
{
    return cachedData.RecommendedSteps;
})
.WithName("Recommended Steps");

app.Run();
