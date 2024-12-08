using System.Globalization;
using Ardalis.SharedKernel;
using FastEndpoints;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Extensions;

namespace JamTime.Backend.Web.Endpoints.Reservations.GetById;

public class GetReservationByIdEndpoint(IReadRepository<Reservation> reservationRepository, AppDbContext dbContext)
  : Endpoint<GetReservationByIdRequest, GetReservationByIdResponse>
{
  public override void Configure()
  {
    Get("/reservations/{Id:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(GetReservationByIdRequest req, CancellationToken ct)
  {
    var reservation = await reservationRepository.GetByIdAsync(req.Id, ct);
    var bandName = dbContext.Bands.First(b => b.Id == reservation!.BandId).Name;
    var roomName = dbContext.Rooms.First(r => r.Id == reservation!.RoomId).Name;

    Response = new GetReservationByIdResponse
    {
      Id = reservation!.Id,
      From = reservation.From.ToString(CultureInfo.CurrentCulture),
      To = reservation.To.ToString(CultureInfo.CurrentCulture),
      BandName = bandName,
      RoomName = roomName,
      StatusName = reservation.Status.ToLocalizedString(),
      Remark = reservation.Remark ?? string.Empty
    };
  }
}
