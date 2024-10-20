using JamTime.Backend.Core.ReservationAggregate;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Data;

public static class SeedData
{
  public static readonly Reservation Reservation1 = new("Reservation1", DateTime.Parse("2024-01-01 12:00:00"), DateTime.Parse("2024-01-01 13:00:00"));
  public static readonly Reservation Reservation2 = new("Reservation2", DateTime.Parse("2024-02-02 14:00:00"), DateTime.Parse("2024-02-02 16:00:00"));

  public static async Task InitializeAsync(AppDbContext dbContext)
  {
    if (await dbContext.Reservations.AnyAsync()) return; // DB has been seeded

    await PopulateTestDataAsync(dbContext);
  }

  public static async Task PopulateTestDataAsync(AppDbContext dbContext)
  {
    dbContext.Reservations.AddRange([Reservation1, Reservation2]);
    await dbContext.SaveChangesAsync();
  }
}
