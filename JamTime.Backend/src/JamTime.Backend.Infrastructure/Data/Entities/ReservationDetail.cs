namespace JamTime.Backend.Infrastructure.Data.Entities;

public class ReservationDetail
{
  public int ReservationId { get; set; }
  public Guid CreatorUserId { get; set; }
  public DateTime CreatedOn { get; set; } = DateTime.Now;
}
