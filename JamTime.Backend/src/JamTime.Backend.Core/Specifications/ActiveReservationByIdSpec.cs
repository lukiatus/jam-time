using Ardalis.Specification;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Core.Enums;

namespace JamTime.Backend.Core.Specifications;

public class ActiveReservationByIdSpec : Specification<Reservation>
{
  public ActiveReservationByIdSpec(int id)
  {
    Query.Where(r => r.Status == ReservationStatus.Accepted && r.Id == id);
  }
}
