using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Bands.List;
using JamTime.Backend.UseCases.DTOs;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Queries;

public class BandQueryService(AppDbContext context) : IBandQueryService
{
  public async Task<IEnumerable<BandDetailsDTO>> ListAsync(int skip = 0, int take = 1000,
    CancellationToken ct = default)
  {
    var bands = context.Bands;
    var musicians = context.Musicians;

    var bandsWithLeader = await bands
      .OrderByDescending(b => b.Name)
      .Skip((skip) * take)
      .Take(take)
      .Join(musicians,
        band => band.LeaderMusicianId,
        musician => musician.Id,
        (band, musician) => new BandDetailsDTO { Id = band.Id, Name = band.Name, LeaderName = musician.Name })
      .ToListAsync(ct);

    return bandsWithLeader;
  }
}
