using JamTime.Backend.Web.Endpoints.Authentication;

namespace JamTime.Backend.Web.Services;

public interface IAuthService
{
  Task<TokenData> AuthenticateAsync(string idToken, CancellationToken ct = default);
  Task<TokenData> ExchangeTokens(string accessToken, string refreshToken, CancellationToken ct = default);
}
