using JamTime.Backend.Core.Entities;
using Xunit;

namespace JamTime.Backend.UnitTests.Core;

public class BandTests
{
  private readonly Band _sut = new Band("Initial Name", 1);

  [Fact]
  public void UpdateName_method_should_change_the_band_name()
  {
    // Arrange
    const string newName = "New Name";

    // Act
    this._sut.UpdateName(newName);

    // Assert
    Assert.Equal(newName, this._sut.Name);
  }

  [Fact]
  public void UpdateLeader_method_should_change_the_band_leader()
  {
    // Arrange
    const int newLeaderId = 2;

    // Act 
    this._sut.UpdateLeader(newLeaderId);

    // Assert
    Assert.Equal(newLeaderId, this._sut.LeaderMusicianId);
  }
}
