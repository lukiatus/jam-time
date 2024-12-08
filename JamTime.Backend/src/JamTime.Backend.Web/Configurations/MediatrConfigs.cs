using Ardalis.SharedKernel;
using MediatR;
using System.Reflection;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.UseCases.Reservations.Create;

namespace JamTime.Backend.Web.Configurations;

public static class MediatrConfigs
{
  public static IServiceCollection AddMediatrConfigs(this IServiceCollection services)
  {
    var mediatRAssemblies = new[]
    {
      Assembly.GetAssembly(typeof(Reservation)), // Core
      Assembly.GetAssembly(typeof(CreateReservationCommand)) // UseCases
    };

    services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(mediatRAssemblies!))
      .AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>))
      .AddScoped<IDomainEventDispatcher, MediatRDomainEventDispatcher>();

    return services;
  }
}
