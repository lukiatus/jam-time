using FastEndpoints;
using FastEndpoints.Swagger;
using JamTime.Backend.Web.Configurations;
using Microsoft.AspNetCore.Localization;
using Serilog;
using Serilog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(builder =>
  {
    builder.WithOrigins(allowedOrigins!)
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials();
  });
});

var logger = Log.Logger = new LoggerConfiguration()
  .Enrich.FromLogContext()
  .WriteTo.Console()
  .CreateLogger();

logger.Information("Starting web host");

builder.AddLoggerConfigs();

var appLogger = new SerilogLoggerFactory(logger)
  .CreateLogger<JamTime.Backend.Web.Program>();

builder.Services.AddOptionConfigs(builder.Configuration, appLogger, builder);
builder.Services.AddServiceConfigs(appLogger, builder);

builder.Services.AddFastEndpoints()
  .SwaggerDocument(o =>
  {
    o.ShortSchemaNames = true;
  });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseRequestLocalization(new RequestLocalizationOptions
{
  DefaultRequestCulture = new RequestCulture("hu-HU")
});

await app.UseAppMiddleware();
app.Run();


// Make the implicit Program.cs class public, so integration tests can reference the correct assembly for host building
namespace JamTime.Backend.Web
{
  public partial class Program
  {
  }
}
