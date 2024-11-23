using HackaTuLuWonderland.Application;

namespace HackaTuLuWonderland.BackgrundWorker;

public class MyBackgroundWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<MyBackgroundWorker> _logger;

    private readonly DashboardApp _dashboardApp;

    public MyBackgroundWorker(IServiceScopeFactory scopeFactory, 
        ILogger<MyBackgroundWorker> logger,
        DashboardApp dashboardApp)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _dashboardApp = dashboardApp;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("{Type} is now running in the background.", nameof(MyBackgroundWorker));

        await BackgroundProcessing(stoppingToken);
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogCritical(
            "The {Type} is stopping due to a host shutdown, queued items might not be processed anymore.",
            nameof(MyBackgroundWorker)
        );

        return base.StopAsync(cancellationToken);
    }

    private async Task BackgroundProcessing(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                _logger.LogInformation("Retrieved Data");
                await _dashboardApp.Execute();
                await Task.Delay(60_000, stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred when publishing a book. Exception: {@Exception}", ex);
            }
        }
    }
}