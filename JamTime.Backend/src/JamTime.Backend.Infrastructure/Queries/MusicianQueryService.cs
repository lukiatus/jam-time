using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Users;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Queries;

public class MusicianQueryService(AppDbContext dbContext) : IMusicianQueryService
{
  public async Task<IEnumerable<MusicianWithBandsDTO>> ListWithBandsAsync(int skip, int take, CancellationToken ct)
  {
    var musiciansWithBands = await dbContext.Musicians
      .Join(dbContext.Set<MusicianBand>(),
        m => m.Id,
        mb => mb.MusicianId,
        (musician, musicianBands) => new { musician, musicianBands }
      )
      .OrderBy(j => j.musician.Name)
      .Select(j =>
        new MusicianWithBandsDTO { Id = j.musician.Id, Name = j.musician.Name, Bands = Enumerable.Empty<BandDTO>() })
      .ToListAsync(ct);

    return musiciansWithBands;
  }
}
