using System.ComponentModel.DataAnnotations;

namespace JamTime.Backend.Web.Options;

public class JwtSettings
{
  private const int MinExpiryInMinutes = 10;
  private const int MaxExpiryInMinutes = 1440;
  private const int KeyMinimumLength = 50;
  
  [Required]
  [MinLength(KeyMinimumLength)]
  public string SecretKey { get; init; } = string.Empty;
  [Required]
  public string Issuer { get; init; } = string.Empty;
  [Required]
  public string Audience { get; init; } = string.Empty;
  [Range(MinExpiryInMinutes, MaxExpiryInMinutes)]
  public int ExpiryInMinutes { get; init; } = 10;
}
