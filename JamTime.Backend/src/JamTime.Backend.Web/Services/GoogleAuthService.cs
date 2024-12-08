using Google.Apis.Auth;
using JamTime.Backend.Web.Models;

namespace JamTime.Backend.Web.Services;

public class GoogleAuthenticator : IAuthenticator
{
  public string ProviderName => "Google";
  private const string ClientId = "468586923507-ohrhbikkne52bm39hn0vosej4pftrjpi.apps.googleusercontent.com";

  public async Task<TokenPayload> AuthenticateAsync(string idToken, CancellationToken ct = default)
  {
    var validationSettings = new GoogleJsonWebSignature.ValidationSettings { Audience = [ClientId] };
    var verifiedToken = await GoogleJsonWebSignature.ValidateAsync(idToken, validationSettings);

    return new TokenPayload(verifiedToken.Subject, verifiedToken.Email, verifiedToken.Name);
  }
}
