using Ardalis.GuardClauses;
using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.ReservationAggregate;

public class Reservation(string title, DateTime from, DateTime to) : EntityBase<Guid>, IAggregateRoot
{
  public string Title { get; private set; } = Guard.Against.NullOrEmpty(title, nameof(title));
  public DateTime From { get; private set; } = Guard.Against.Null(from, nameof(from));
  public DateTime To { get; private set; } = Guard.Against.Null(to, nameof(to));
}
