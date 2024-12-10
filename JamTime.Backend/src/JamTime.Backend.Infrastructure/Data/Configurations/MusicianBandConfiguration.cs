using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class MusicianBandConfiguration: IEntityTypeConfiguration<MusicianBand>
{
  public void Configure(EntityTypeBuilder<MusicianBand> builder)
  {
    builder
      .HasKey(mb => new { mb.MusicianId, mb.BandId });
  }
}
