using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Events;

public sealed class UserCreatedEvent(int userId) : DomainEventBase
{
  public int UserId { get; } = userId;
}
