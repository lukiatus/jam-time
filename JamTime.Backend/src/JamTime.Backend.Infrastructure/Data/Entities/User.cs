using System.ComponentModel.DataAnnotations;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.Infrastructure.Data.Entities;

public class User()
{
  public Guid Id { get; set; }
   
  public int MusicianId { get; set; }

  [MaxLength(50)]
  public required string ExternalId { get; set; }

  [MaxLength(50)]
  public required string ExternalProvider { get; set; }

  [MaxLength(254)]
  public string? Email { get; set; } = string.Empty;

  [MaxLength(100)]
  public string? RefreshToken { get; set; }

  public DateTime? RefreshTokenValidUntil { get; set; }
  
  public DateTime CreatedAt { get; set; } = DateTime.Now;

  public Musician Musician { get; set; } = default!;
  public ICollection<UserRole> UserRoles { get; set; } = default!;
}
