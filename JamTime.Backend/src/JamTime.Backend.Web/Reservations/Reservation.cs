namespace JamTime.Backend.Web.Reservations;

public sealed record Reservation(int Id, string Name, DateTime StartDate, DateTime EndDate);
