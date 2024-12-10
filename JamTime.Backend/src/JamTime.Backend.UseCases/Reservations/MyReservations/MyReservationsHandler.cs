using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Reservations.List;

namespace JamTime.Backend.UseCases.Reservations.MyReservations;

public class MyReservationsHandler(IReservationQueryService queryService)
  : IQueryHandler<MyReservationsQuery, Result<IEnumerable<ReservationDTO>>>
{
  public async Task<Result<IEnumerable<ReservationDTO>>> Handle(MyReservationsQuery req, CancellationToken ct)
  {
    var reservations = await queryService.ListByUserIdAsync(req.UserId, req.Skip, req.Take, ct);

    return reservations
      .OrderBy(r => r.From)
      .Select(r => new ReservationDTO
      {
        Id = r.Id,
        Band = r.Band,
        From = r.From,
        To = r.To,
        Room = r.Room,
        Remark = r.Remark,
        Status = r.Status,
      }).ToList();
  }
}
