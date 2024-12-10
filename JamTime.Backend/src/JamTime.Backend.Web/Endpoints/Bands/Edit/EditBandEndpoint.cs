using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Bands.Edit;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Bands.Edit;

public class EditBandEndpoint(IMediator mediator, AppDbContext dbContext): Endpoint<EditBandRequest, Result>
{
  public override void Configure()
  {
    Put("/bands/{bandId:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader);
  }

  public override async Task HandleAsync(EditBandRequest req, CancellationToken ct)
  {
    var command = new EditBandCommand(req.BandId, req.Name, req.LeaderMusicianId, req.Members);
    var result = await mediator.Send(command, ct);

    var a = await dbContext.MusicianBands.Where(mb => mb.BandId == req.BandId).ToListAsync(ct);
    dbContext.MusicianBands.RemoveRange(a);
    
    req.Members.ToList().ForEach(m =>
      dbContext.MusicianBands.Add(new MusicianBand { BandId = req.BandId, MusicianId = m }));
    
    await dbContext.SaveChangesAsync(ct);
    
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
