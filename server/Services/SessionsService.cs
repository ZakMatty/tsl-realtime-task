using Microsoft.AspNetCore.SignalR;
 using System.Net.Http.Json;

public class SessionsService : BackgroundService
{
    private readonly IHubContext<SessionsHub> _hub;
    private readonly HttpClient _httpClient = new HttpClient();

    public SessionsService(IHubContext<SessionsHub> hub)
    {
        _hub = hub;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var url = "http://dev-sample-api.tsl-timing.com/sessions";
                var sessions = await _httpClient.GetFromJsonAsync<List<object>>(url, cancellationToken: stoppingToken);

                if (sessions != null)
                {
                    Console.WriteLine($"📡 Pushing {sessions.Count} sessions...");
                    await _hub.Clients.All.SendAsync("ReceiveSessionsUpdate", sessions, cancellationToken: stoppingToken);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error fetching sessions: {ex.Message}");
            }
            await Task.Delay(30000, stoppingToken); // refresh every 30s
        }
    }
}