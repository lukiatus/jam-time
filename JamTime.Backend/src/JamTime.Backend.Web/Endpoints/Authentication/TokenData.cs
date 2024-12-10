namespace JamTime.Backend.Web.Endpoints.Authentication;

public class TokenData
{
  public string AccessToken { get; set; } = default!;
  public DateTime AccessTokenExpirationTime { get; set; }
  public string RefreshToken { get; set; } = default!;
  public DateTime RefreshTokenExpirationTime { get; set; }
}
