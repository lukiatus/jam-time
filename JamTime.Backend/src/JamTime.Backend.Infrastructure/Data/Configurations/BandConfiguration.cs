using JamTime.Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class BandConfiguration: IEntityTypeConfiguration<Band>
{
  public void Configure(EntityTypeBuilder<Band> builder)
  {
    builder.HasOne<Musician>()
      .WithMany()
      .HasForeignKey(b => b.LeaderMusicianId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
