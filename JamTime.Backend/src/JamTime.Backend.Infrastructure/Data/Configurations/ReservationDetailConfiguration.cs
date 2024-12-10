using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class ReservationDetailConfiguration: IEntityTypeConfiguration<ReservationDetail>
{
  public void Configure(EntityTypeBuilder<ReservationDetail> builder)
  {
    builder.HasKey(rd => rd.ReservationId);
    
    builder.HasOne<Reservation>()
      .WithMany()
      .HasForeignKey(x => x.ReservationId);
    
    builder.HasOne<User>()
      .WithMany()
      .HasForeignKey(i => i.CreatorUserId);
    
    builder.Property(rd => rd.CreatedOn).IsRequired();
  }
}
