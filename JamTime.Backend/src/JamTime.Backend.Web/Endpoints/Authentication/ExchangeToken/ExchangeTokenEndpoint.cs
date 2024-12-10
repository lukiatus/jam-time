using FastEndpoints;
using JamTime.Backend.Web.Services;

namespace JamTime.Backend.Web.Endpoints.Authentication.ExchangeToken;

public class ExchangeTokenEndpoint(IAuthService authService)
  : Endpoint<ExchangeTokenRequest, TokenData>
{
  public override void Configure()
  {
    Post("/authentication/tokens");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ExchangeTokenRequest req, CancellationToken ct)
  {
    var tokenData = await authService.ExchangeTokens(req.AccessToken, req.RefreshToken, ct);
    Response = tokenData;
  }
}
