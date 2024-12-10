using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Rooms.List;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Queries;

public class RoomQueryService(AppDbContext dbContext) : IRoomQueryService
{
  public async Task<IEnumerable<RoomDTO>> ListAsync(int skip = 0, int take = 1000, CancellationToken ct = default)
  {
    var rooms = await dbContext.Rooms
      .OrderByDescending(b => b)
      .Skip((skip) * take)
      .Take(take)
      .Select(r => new RoomDTO { Id = r.Id, Name = r.Name, Capacity = r.Capacity, Place = r.Place })
      .ToListAsync(ct);

    return rooms;
  }
}
