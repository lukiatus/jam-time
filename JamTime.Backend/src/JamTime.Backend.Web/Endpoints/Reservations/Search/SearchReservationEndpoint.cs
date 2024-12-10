using System.Globalization;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Extensions;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Reservations.Search;

public class SearchReservationEndpoint(AppDbContext dbContext)
  : Endpoint<SearchReservationRequest, IEnumerable<SearchReservationResponse>>
{
  public override void Configure()
  {
    Get("/reservations/search");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(SearchReservationRequest req, CancellationToken ct)
  {
    var query = dbContext.Reservations
      .Join(dbContext.Rooms,
        res => res.RoomId,
        room => room.Id,
        (reservation, room) => new { reservation, room }
      )
      .Join(dbContext.Bands,
        g => g.reservation.BandId,
        band => band.Id,
        (g, band) => new { Reservation = g.reservation, Room = g.room, Band = band }
      )
      .AsQueryable();
    if (req.From is not null)
    {
      query = query.Where(g => g.Reservation.From >= req.From);
    }

    if (req.To is not null)
    {
      query = query.Where(g => g.Reservation.To <= req.To.Value.AddDays(1));
    }

    if (req.Status is not null)
    {
      query = query.Where(g => g.Reservation.Status == req.Status);
    }

    if (!string.IsNullOrEmpty(req.SearchText))
    {
      query = query.Where(g =>
        (g.Reservation.Remark != null && g.Reservation.Remark.Contains(req.SearchText))
        || g.Band.Name.Contains(req.SearchText)
        || g.Room.Name.Contains(req.SearchText)
      );
    }

    var reservations = await query.Select(g => new SearchReservationResponse
    {
      Id = g.Reservation.Id,
      BandName = g.Band.Name,
      From = g.Reservation.From.ToString("g", CultureInfo.CurrentCulture),
      To = g.Reservation.To.ToString("g", CultureInfo.CurrentCulture),
      RoomName = g.Room.Name,
      Remark = g.Reservation.Remark ?? string.Empty,
      StatusName = g.Reservation.Status.ToLocalizedString()
    }).ToListAsync(ct);

    Response = reservations;
  }
}
