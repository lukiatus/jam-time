using System.ComponentModel.DataAnnotations;

namespace JamTime.Backend.Infrastructure.Data.Entities;

public class AppNotification
{
  public int Id { get; set; }
  [MaxLength(500)]
  public string Message { get; set; } = string.Empty;
  public DateTime? ReadOn { get; set; }
  public Guid RecipientId { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.Now;
}
