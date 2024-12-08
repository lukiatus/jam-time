using FastEndpoints;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Users;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Users.ListWithBands;

public class ListUsersWithBandsEndpoint(IMediator mediator) : EndpointWithoutRequest<IEnumerable<MusicianWithBandsDTO>>
{
  public override void Configure()
  {
    Get("/users-with-bands");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);  
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var a = HttpContext.User.Identity;
    var result = await mediator.Send(new ListUsersWithBandsQuery(0, 1000), ct);

    if (result.IsSuccess)
    {
      Response = result.Value;
    }
  }
}
