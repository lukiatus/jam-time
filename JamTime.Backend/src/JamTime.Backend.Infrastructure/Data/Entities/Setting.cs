using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JamTime.Backend.Infrastructure.Data.Entities;

public class Setting
{
  [Key]
  public required string Key { get; set; }

  [MaxLength(1000)]
  public string? Value { get; set; }
}
