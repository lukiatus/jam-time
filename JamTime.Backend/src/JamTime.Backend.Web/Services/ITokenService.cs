
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Endpoints.Authentication;

namespace JamTime.Backend.Web.Services;

public interface ITokenService
{
  TokenData GenerateTokens(Guid userId, IEnumerable<RoleEnum> roles);
  Guid ValidateAccessTokenWithoutExpiration(string accessToken);
}
