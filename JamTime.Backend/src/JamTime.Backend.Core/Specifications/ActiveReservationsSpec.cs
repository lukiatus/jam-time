using Ardalis.Specification;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Core.Enums;

namespace JamTime.Backend.Core.Specifications;

public class ActiveReservationsSpec : Specification<Reservation>
{
  public ActiveReservationsSpec()
  {
    Query.Where(r => r.Status == ReservationStatus.Accepted && r.To > DateTime.Now);
  }
}
