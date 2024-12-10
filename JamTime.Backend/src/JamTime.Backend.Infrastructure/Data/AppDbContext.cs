using System.Reflection;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using SmartEnum.EFCore;

namespace JamTime.Backend.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options, IDomainEventDispatcher? dispatcher)
  : DbContext(options)
{
  public DbSet<Musician> Musicians => Set<Musician>();
  public DbSet<Band> Bands => Set<Band>();
  public DbSet<Reservation> Reservations => Set<Reservation>();
  public DbSet<Room> Rooms => Set<Room>();
  public DbSet<User> Users => Set<User>();
  public DbSet<ReservationDetail> ReservationDetails => Set<ReservationDetail>();
  public DbSet<AppNotification> AppNotifications => Set<AppNotification>();
  public DbSet<Concert> Concerts => Set<Concert>();
  public DbSet<Setting> Settings => Set<Setting>();
  public DbSet<MusicianBand> MusicianBands => Set<MusicianBand>();
  public DbSet<UserRole> UserRoles => Set<UserRole>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    base.OnModelCreating(modelBuilder);
  }

  protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
  {
    configurationBuilder.ConfigureSmartEnum();
  }

  public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
  {
    int result = await base.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

    // ignore events if no dispatcher provided
    if (dispatcher == null) return result;

    // dispatch events only if save was successful
    var entitiesWithEvents = ChangeTracker.Entries<HasDomainEventsBase>()
      .Select(e => e.Entity)
      .Where(e => e.DomainEvents.Any())
      .ToArray();

    await dispatcher.DispatchAndClearEvents(entitiesWithEvents.Cast<EntityBase>());

    return result;
  }

  public override int SaveChanges()
  {
    return SaveChangesAsync().GetAwaiter().GetResult();
  }
}
