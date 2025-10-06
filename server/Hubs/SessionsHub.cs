using Microsoft.AspNetCore.SignalR;
 using System.Net.Http;
  using System.Net.Http.Json;
public class SessionsHub : Hub
{
    private readonly IHttpClientFactory _httpClientFactory;
    public SessionsHub(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    // Called automatically when a client connects
    public override async Task OnConnectedAsync()
    {
        try
        {
            var client = _httpClientFactory.CreateClient();
            var sessions = await client.GetFromJsonAsync<List<object>>(
               "http://dev-sample-api.tsl-timing.com/sessions"
            );

            if (sessions != null)
            {
                await Clients.Caller.SendAsync("ReceiveSessionsUpdate",
                 sessions);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending sessions to new client: {ex.Message}");

        }
        await base.OnConnectedAsync();
    }

    // Server can broadcast updates to all clients
    public async Task SendSessionsUpdate(List<object> data)
    {
        await Clients.All.SendAsync("ReceiveSessionsUpdate", data);
    }
           }