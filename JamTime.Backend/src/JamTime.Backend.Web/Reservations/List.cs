using FastEndpoints;

namespace JamTime.Backend.Web.Reservations;

public class List : EndpointWithoutRequest<ReservationListResponse>
{
  public override void Configure()
  {
    Get("/Reservations");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var reservations = new List<Reservation>()
    {
      new Reservation(1, "First reservation", DateTimeOffset.UtcNow.Date, DateTimeOffset.UtcNow.AddHours(1).Date),
      new Reservation(2, "Second reservation", DateTimeOffset.UtcNow.AddHours(-1).Date,
        DateTimeOffset.UtcNow.AddHours(2).Date),
    };

    await SendAsync(new() { Reservations = reservations }, cancellation: ct);
  }
}
