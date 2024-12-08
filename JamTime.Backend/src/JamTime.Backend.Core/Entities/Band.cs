using Ardalis.GuardClauses;
using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Entities;

public class Band(string name, int leaderMusicianId) : EntityBase, IAggregateRoot
{
  public string Name { get; private set; } = Guard.Against.NullOrEmpty(name, nameof(name));
  public int LeaderMusicianId { get; private set; } = Guard.Against.NegativeOrZero(leaderMusicianId, nameof(leaderMusicianId));

  public void UpdateLeader(int leaderMusicianId)
  {
    LeaderMusicianId = Guard.Against.NegativeOrZero(leaderMusicianId, nameof(leaderMusicianId));
  }

  public void UpdateName(string name)
  {
    Name = Guard.Against.NullOrEmpty(name, nameof(name));
  }
}
