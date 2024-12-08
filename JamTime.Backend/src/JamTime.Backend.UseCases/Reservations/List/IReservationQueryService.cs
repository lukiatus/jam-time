using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.List;

public interface IReservationQueryService
{
  Task<IEnumerable<ReservationDTO>> ListAsync(int skip, int take, CancellationToken ct = default);
  Task<IEnumerable<ReservationDTO>> ListByUserIdAsync(Guid userId, int skip, int take, CancellationToken ct = default);
}
