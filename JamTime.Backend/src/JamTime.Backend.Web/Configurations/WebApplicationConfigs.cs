using Ardalis.ListStartupServices;
using FastEndpoints;
using FastEndpoints.Swagger;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Web.Hubs;

namespace JamTime.Backend.Web.Configurations;

public static class WebApplicationConfigs
{
  public static async Task<IApplicationBuilder> UseAppMiddleware(this WebApplication app)
  {
    if (app.Environment.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
      app.UseShowAllServicesMiddleware(); // see https://github.com/ardalis/AspNetCoreStartupServices
    }
    else
    {
      app.UseDefaultExceptionHandler(); // from FastEndpoints
      app.UseHsts();
    }

    app.UseFastEndpoints()
      .UseSwaggerGen(); // Includes AddFileServer and static files middleware

    app.UseHttpsRedirection();
    app.UseCors();
    app.UseAuthorization();

    app.MapHub<AppNotificationHub>("/hubs/notification");
    
    await SeedDatabase(app);
    await Task.CompletedTask;

    return app;
  }

  static async Task SeedDatabase(WebApplication app)
  {
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    
    try
    {
      var context = services.GetRequiredService<AppDbContext>();
      await context.Database.EnsureCreatedAsync();
      await SeedData.InitializeAsync(context);
    }
    catch (Exception ex)
    {
      var logger = services.GetRequiredService<ILogger<Program>>();
      logger.LogError(ex, "An error occurred seeding the DB. {exceptionMessage}", ex.Message);
    }
  }
}
