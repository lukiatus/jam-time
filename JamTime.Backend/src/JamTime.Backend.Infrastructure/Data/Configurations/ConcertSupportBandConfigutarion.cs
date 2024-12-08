using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class ConcertSupportBandConfigutarion: IEntityTypeConfiguration<ConcertSupportBand>
{
  public void Configure(EntityTypeBuilder<ConcertSupportBand> builder)
  {
    builder.HasKey(cb => new { cb.ConcertId, cb.BandName });
  }
}
