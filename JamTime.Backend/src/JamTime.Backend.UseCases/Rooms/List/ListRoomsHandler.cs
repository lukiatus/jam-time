using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.List;

public class ListRoomsHandler(IRoomQueryService queryService)
  : IQueryHandler<ListRoomsQuery, Result<IEnumerable<RoomDTO>>>
{
  public async Task<Result<IEnumerable<RoomDTO>>> Handle(ListRoomsQuery req, CancellationToken ct)
  {
    var rooms = await queryService.ListAsync(req.Skip, req.Take, ct);

    return rooms.Select(r => new RoomDTO { Id = r.Id, Name = r.Name, Capacity = r.Capacity, Place = r.Place }).ToList();
  }
}
