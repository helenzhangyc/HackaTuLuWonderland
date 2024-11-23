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

builder.Services.AddHostedService<MyBackgroundWorker>();

builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowedCorsOrigins",
                builder =>
                {
                    builder
                        .SetIsOriginAllowed(_ => true)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
        });

var app = builder.Build();

app.UseCors("AllowedCorsOrigins");

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

app.Run();
