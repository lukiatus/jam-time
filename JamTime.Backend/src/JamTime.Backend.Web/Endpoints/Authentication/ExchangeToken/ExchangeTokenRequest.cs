namespace JamTime.Backend.Web.Endpoints.Authentication.ExchangeToken;

public class ExchangeTokenRequest
{
  public string AccessToken { get; set; } = default!;
  public string RefreshToken { get; set; } = default!;
}
