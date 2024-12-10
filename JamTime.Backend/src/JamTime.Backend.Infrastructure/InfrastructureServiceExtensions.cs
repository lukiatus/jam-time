using Ardalis.SharedKernel;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Queries;
using JamTime.Backend.UseCases.Bands.List;
using JamTime.Backend.UseCases.Reservations.List;
using JamTime.Backend.UseCases.Rooms.List;
using JamTime.Backend.UseCases.Users;
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
    services.AddDbContext<AppDbContext>(options =>
      options.UseSqlServer(config.GetConnectionString("JamTimeConnection")));

    services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>))
      .AddScoped(typeof(IReadRepository<>), typeof(EfRepository<>))
      .AddScoped<IBandQueryService, BandQueryService>()
      .AddScoped<IReservationQueryService, ReservationQueryService>()
      .AddScoped<IRoomQueryService, RoomQueryService>()
      .AddScoped<IMusicianQueryService, MusicianQueryService>();

    logger.LogInformation("{Project} services registered", "Infrastructure");

    return services;
  }
}
