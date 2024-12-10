using JamTime.Backend.Core.Enums;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.Web.Endpoints.Reservations.MyReservations;

public class MyReservationsResponse
{
  public int Id { get; init; }
  public string BandName { get; init; } = default!;
  public string From { get; init; } = default!;
  public string To { get; init; } = default!;
  public string RoomName { get; init; } = default!;
  public string Remark { get; init; } = default!;
  public string StatusName { get; init; } = default!;
}

