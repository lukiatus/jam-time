using JamTime.Backend.Core.Entities;
using Xunit;

namespace JamTime.Backend.UnitTests.Core;

public class RoomTests
{
  private readonly Room _sut = new Room("Room Name", "Place", 1);

  [Fact]
  public void Activate_method_should_set_IsActive_to_true()
  {
    // Act
    this._sut.Activate();

    // Assert
    Assert.True(this._sut.IsActive);
  }

  [Fact]
  public void Deactivate_method_should_set_IsActive_to_false()
  {
    // Act
    this._sut.Deactivate();

    // Assert
    Assert.False(this._sut.IsActive);
    this._sut.Activate();
  }

  [Fact]
  public void A()
  {
    // Arrange
    const string newName = "New Name";
    const string newPlace = "New Place";
    const int capacity = 3;

    // Act
    this._sut.Update(newName, newPlace, capacity);

    // Assert
    Assert.Equal(newName, this._sut.Name);
    Assert.Equal(newPlace, this._sut.Place);
    Assert.Equal(capacity, this._sut.Capacity);
  }
}
