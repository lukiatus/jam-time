using Ardalis.GuardClauses;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Enums;
using JamTime.Backend.Core.Events;

namespace JamTime.Backend.Core.Entities;

public class Reservation(int bandId, DateTime from, DateTime to, int roomId)
  : EntityBase, IAggregateRoot
{
  public int BandId { get; set; } = Guard.Against.NegativeOrZero(bandId, nameof(bandId));
  public DateTime From { get; private set; } = Guard.Against.Null(from, nameof(from));
  public DateTime To { get; private set; } = Guard.Against.Null(to, nameof(to));
  public int RoomId { get; private set; } = Guard.Against.NegativeOrZero(roomId, nameof(roomId));
  public ReservationStatus Status { get; private set; } = ReservationStatus.Accepted;
  public string? Remark { get; private set; }

  public void SetRemark(string remark) => Remark = remark;

  public void Cancel(string reason)
  {
    Status = ReservationStatus.Deleted;
    RegisterDomainEvent(new ReservationCancelledEvent(Id));
  }

  public void Reject(string reason)
  {
    Status = ReservationStatus.Rejected;
    RegisterDomainEvent(new ReservationRejectedEvent(Id, reason));
  }

  public void ModifyDetails(int bandId, DateTime from, DateTime to, int roomId)
  {
    BandId = Guard.Against.NegativeOrZero(bandId, nameof(bandId));
    From = Guard.Against.Null(from, nameof(from));
    To = Guard.Against.Null(to, nameof(to));
    RoomId = Guard.Against.NegativeOrZero(roomId, nameof(roomId));
  }
}
