using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Concerts.Delete;

public class DeleteConcertEndpoint(AppDbContext dbContext): Endpoint<DeleteConcertRequest, Result>
{
  public override void Configure()
  {
    Delete("/concerts/{concertId:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader);
  }

  public override async Task HandleAsync(DeleteConcertRequest req, CancellationToken ct)
  {
    var concertToDelete = await dbContext.Concerts.FirstAsync(c => c.Id == req.ConcertId, ct);
    dbContext.Concerts.Remove(concertToDelete);
    await dbContext.SaveChangesAsync(ct);
    
    await SendNoContentAsync(ct);
  }
}
