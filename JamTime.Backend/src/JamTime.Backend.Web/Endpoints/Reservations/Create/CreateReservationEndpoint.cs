using System.Security.Claims;
using Ardalis.SharedKernel;
using FastEndpoints;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.Create;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Reservations.Create;

public class CreateReservationEndpoint(IMediator mediator, IReadRepository<Reservation> reservationRepository, AppDbContext dbContext)
  : Endpoint<CreateReservationRequest, CreateReservationResponse>
{
  public override void Configure()
  {
    Post("/reservations");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CreateReservationRequest req, CancellationToken ct)
  {
    var userId = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
    var command = new CreateReservationCommand(req.BandId, req.From, req.To, req.RoomId, req.Remark);
    var reservationId = await mediator.Send(command, ct);
    dbContext.ReservationDetails.Add(new ReservationDetail { ReservationId = reservationId, CreatorUserId = userId, });
    await dbContext.SaveChangesAsync(ct);
    
    var createdReservation = await reservationRepository.GetByIdAsync(reservationId.Value, ct);

    Response = new CreateReservationResponse
    {
      Id = createdReservation!.Id, BandName = "AJJAJ", Remark = createdReservation.Remark ?? string.Empty
    };
  }
}
