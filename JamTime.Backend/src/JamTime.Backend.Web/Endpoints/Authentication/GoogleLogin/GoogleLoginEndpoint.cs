using FastEndpoints;
using JamTime.Backend.Web.Services;

namespace JamTime.Backend.Web.Endpoints.Authentication.GoogleLogin;

public class GoogleLoginEndpoint(IAuthService authService)
  : Endpoint<GoogleLoginRequest, TokenData>
{
  public override void Configure()
  {
    Post("/authentication/google-login");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GoogleLoginRequest req, CancellationToken ct)
  {
    var tokenData = await authService.AuthenticateAsync(req.IdToken, ct);

    Response = tokenData;
  }
}
