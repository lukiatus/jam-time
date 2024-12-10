using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.List;

public class ListReservationsHandler(IReservationQueryService queryService)
  : IQueryHandler<ListReservationsQuery, Result<IEnumerable<ReservationDTO>>>
{
  public async Task<Result<IEnumerable<ReservationDTO>>> Handle(ListReservationsQuery req, CancellationToken ct)
  {
    var reservations = await queryService.ListAsync(req.Skip, req.Take, ct);

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
