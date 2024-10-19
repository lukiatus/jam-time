using FastEndpoints;

namespace JamTime.Backend.Web.Auth;

public class Login : Endpoint<GoogleAuthenticationRequest, EmptyResponse>{
  public override void Configure()
  {
    Post("/auth/google-login");
    AllowAnonymous();
  }

  public override Task<EmptyResponse> ExecuteAsync(GoogleAuthenticationRequest req, CancellationToken ct)
  {
    return Task.FromResult(new EmptyResponse());
  }
}
