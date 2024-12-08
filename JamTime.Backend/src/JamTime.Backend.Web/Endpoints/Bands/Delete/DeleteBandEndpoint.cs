using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.Bands.Delete;
using JamTime.Backend.UseCases.Enums;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Bands.Delete;

public class DeleteBandEndpoint(IMediator mediator) : Endpoint<DeleteBandRequest, Result>
{
  public override void Configure()
  {
    Delete("/bands/{Id:int}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(DeleteBandRequest req, CancellationToken ct)
  {
    var command = new DeleteBandCommand(req.Id);
    var result = await mediator.Send(command, ct);

    if (result.Status == ResultStatus.NotFound)
    {
      await SendNotFoundAsync(ct);
      return;
    }

    if (result.IsSuccess)
    {
      await SendNoContentAsync(ct);
    }
  }
}
