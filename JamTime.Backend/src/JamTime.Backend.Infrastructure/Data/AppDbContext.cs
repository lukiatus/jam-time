using JamTime.Backend.Core.ReservationAggregate;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
  {
    // Disable transactions because MongoDb in docker does not support it 
    Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;
  }

  public DbSet<Reservation> Reservations { get; set; }
}


