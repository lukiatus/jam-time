using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.List;

public interface IRoomQueryService
{
  Task<IEnumerable<RoomDTO>> ListAsync(int skip, int take, CancellationToken ct);
}
