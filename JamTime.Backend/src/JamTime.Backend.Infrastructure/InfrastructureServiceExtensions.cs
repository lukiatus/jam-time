using Ardalis.GuardClauses;
using JamTime.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace JamTime.Backend.Infrastructure;

public static class InfrastructureServiceExtensions
{
  public static IServiceCollection AddInfrastructureServices(
    this IServiceCollection services,
    ConfigurationManager config,
    ILogger logger)
  {
    string? connectionString = config.GetConnectionString("MongoConnection");
    Guard.Against.Null(connectionString);
    services.AddDbContext<AppDbContext>(options =>
      options.UseMongoDB(connectionString, "JamTime"));

    logger.LogInformation("{Project} services registered", "Infrastructure");

    return services;
  }
}
