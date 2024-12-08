using FastEndpoints;
using JamTime.Backend.UseCases.Bands.List;
using JamTime.Backend.UseCases.Enums;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Bands.List;

public class ListBandEndpoint(IMediator mediator) : EndpointWithoutRequest<List<ListBandResponse>>
{
  public override void Configure()
  {
    Get("/bands");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListBandsQuery(0, 1000), ct);

    if (result.IsSuccess)
    {
      Response = result.Value.Select(b => new ListBandResponse { Id = b.Id, Name = b.Name, LeaderName = b.LeaderName })
        .ToList();
    }
  }
}
