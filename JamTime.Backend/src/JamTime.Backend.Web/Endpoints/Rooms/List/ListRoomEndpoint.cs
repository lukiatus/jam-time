using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Rooms.List;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Rooms.List;

public class ListRoomEndpoint(IMediator mediator) : EndpointWithoutRequest<List<ListRoomResponse>>
{
  public override void Configure()
  {
    Get("/rooms");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListRoomsQuery(0, 1000), ct);

    if (result.IsSuccess)
    {
      Response = result.Value.Select(r => new ListRoomResponse
      {
        Id = r.Id, Name = r.Name, Capacity = r.Capacity, Place = r.Place
      }).ToList();
    }
  }
}
