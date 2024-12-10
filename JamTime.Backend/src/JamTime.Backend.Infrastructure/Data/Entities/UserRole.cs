using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JamTime.Backend.UseCases.Enums;

namespace JamTime.Backend.Infrastructure.Data.Entities;

[Table("UserRoles")]
public class UserRole
{
  public required Guid UserId { get; set; }
  [MaxLength(50)]
  public required RoleEnum Role { get; set; } = null!;
}
