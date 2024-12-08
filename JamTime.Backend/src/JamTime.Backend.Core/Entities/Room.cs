using Ardalis.GuardClauses;
using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Entities;

public class Room(string name, string place, int capacity) : EntityBase, IAggregateRoot
{
  public string Name { get; private set; } = Guard.Against.NullOrEmpty(name, nameof(name));
  public string Place { get; private set; } = Guard.Against.NullOrEmpty(place, nameof(place));
  public int Capacity { get; private set; } = Guard.Against.NegativeOrZero(capacity, nameof(capacity));
  public bool IsActive { get; private set; } = true;

  public void Deactivate()
  {
    IsActive = false;
  }

  public void Activate()
  {
    IsActive = true;
  }

  public void Update(string name, string place, int capacity)
  {
    Name = Guard.Against.NullOrEmpty(name, nameof(name));
    Place = Guard.Against.NullOrEmpty(place, nameof(place));
    Capacity = Guard.Against.NegativeOrZero(capacity, nameof(capacity));
  }
}
