using Microsoft.AspNetCore.Mvc;
 using System.Net.Http;
  using System.Net.Http.Json;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public SessionsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        // GET: api/sessions
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var url = "http://dev-sample-api.tsl-timing.com/sessions";
            try
            {
                var sessions = await
                 _httpClient.GetFromJsonAsync<List<object>>(url);
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // GET: api/sessions/{sessionId}
        [HttpGet("{sessionId}")]
        public async Task<IActionResult> GetSessionById(string sessionId)
        {
            var url = $"http://dev-sample-api.tsl-timing.com/sessions/{sessionId}";

            try
            {
                var session = await _httpClient.GetFromJsonAsync<object>
                (url);
                if (session == null)
                {
                    return NotFound(new { error = "Session not found" });
                }
                return Ok(session);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}