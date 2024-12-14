using JamTime.Backend.Core.Entities;
using JamTime.Backend.Core.Enums;
using Xunit;

namespace JamTime.Backend.UnitTests.Core;

public class ReservationTests
{
  private readonly Reservation _sut = new Reservation(1, DateTime.Now, DateTime.Now.AddHours(1), 1);

  [Fact]
  public void SetRemark_method_should_change_remark()
  {
    // Arrange
    const string newRemark = "New remark";

    // Act
    this._sut.SetRemark(newRemark);

    // Assert
    Assert.Equal(newRemark, _sut.Remark);
  }

  [Fact]
  public void Reject_method_should_change_the_status_to_rejected()
  {
    // Arrange
    const string reason = "Rejection reason";

    // Act
    this._sut.Reject(reason);

    // Assert
    Assert.Equal(ReservationStatus.Rejected, this._sut.Status);
  }

  [Fact]
  public void Cancel_method_should_change_the_status_to_deleted()
  {
    // Arrange
    const string reason = "Cancellation reason";

    // Act
    this._sut.Cancel(reason);

    // Assert
    Assert.Equal(ReservationStatus.Deleted, this._sut.Status);
  }

  [Fact]
  public void ModifyDetails_method_should_modify_reservation_details()
  {
    // Arrange
    const int bandId = 11;
    DateTime from = DateTime.Now.AddHours(10);
    DateTime to = from.AddHours(11);
    const int roomId = 99;

    // Act
    this._sut.ModifyDetails(bandId, from, to, roomId);

    // Assert
    Assert.Equal(bandId, this._sut.BandId);
    Assert.Equal(from, this._sut.From);
    Assert.Equal(to, this._sut.To);
    Assert.Equal(roomId, this._sut.RoomId);
  }
}
