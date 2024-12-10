using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class MusicianConfiguration : IEntityTypeConfiguration<Musician>
{
  public void Configure(EntityTypeBuilder<Musician> builder)
  {
    builder.Ignore(m => m.BandIds);

    // builder.HasMany<MusicianBand>()
    //   .WithOne().HasForeignKey(m => m.BandId);
  }
}
