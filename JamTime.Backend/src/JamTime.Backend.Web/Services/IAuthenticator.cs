using JamTime.Backend.Web.Models;

namespace JamTime.Backend.Web.Services;

public interface IAuthenticator
{
  Task<TokenPayload> AuthenticateAsync(string idToken, CancellationToken ct = default);
  string ProviderName { get; }
}
