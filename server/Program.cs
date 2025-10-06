var builder = WebApplication.CreateBuilder(args);

// ✅ Register services BEFORE Build()
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddHttpClient(); // 👈 Register HttpClient for SessionsController
builder.Services.AddHostedService<SessionsService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", b =>
        b.SetIsOriginAllowed(origin =>
        {
            // ✅ Allow localhost on any port during dev
            if (origin.StartsWith("http://localhost"))
                return true;

            return false;
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});
var app = builder.Build();

// ✅ Configure middleware and endpoints BEFORE app.Run()
app.UseCors("AllowFrontend");

app.MapControllers();
app.MapHub<SessionsHub>("/sessionsHub").RequireCors("AllowFrontend");

app.Run();
