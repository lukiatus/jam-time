using Ardalis.GuardClauses;
using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Entities;

public class Musician(string name) : EntityBase, IAggregateRoot
{
  public string Name { get; set; } = Guard.Against.NullOrEmpty(name, nameof(name));
  public IEnumerable<int> BandIds { get; set; } = new List<int>();
}
