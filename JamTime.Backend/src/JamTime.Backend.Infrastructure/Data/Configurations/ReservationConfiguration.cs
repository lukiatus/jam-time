using JamTime.Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class ReservationConfiguration: IEntityTypeConfiguration<Reservation>
{
  public void Configure(EntityTypeBuilder<Reservation> builder)
  {
    builder.HasOne<Band>()
      .WithMany()
      .HasForeignKey(i => i.BandId)
      .IsRequired();
    
    builder.HasOne<Room>()
      .WithMany()
      .HasForeignKey(i => i.RoomId)
      .IsRequired();
  }
}
