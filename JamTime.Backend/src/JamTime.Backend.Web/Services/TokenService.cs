using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Endpoints.Authentication;
using JamTime.Backend.Web.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace JamTime.Backend.Web.Services;

public class TokenService(IOptions<JwtSettings> jwtSettings) : ITokenService
{
  public TokenData GenerateTokens(Guid userId, IEnumerable<RoleEnum> roles)
  {
    var accessTokenExpiry = DateTimeOffset.UtcNow.AddMinutes(jwtSettings.Value.ExpiryInMinutes).DateTime;
    var refreshTokenExpiry = DateTimeOffset.UtcNow.AddDays(7).DateTime;
    var accessToken = GenerateAccessToken(userId, roles.ToArray());
    var refreshToken = GenerateRefreshToken();

    return new TokenData
    {
      AccessToken = accessToken,
      RefreshToken = refreshToken,
      AccessTokenExpirationTime = accessTokenExpiry,
      RefreshTokenExpirationTime = refreshTokenExpiry
    };
  }

  public Guid ValidateAccessTokenWithoutExpiration(string accessToken)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    tokenHandler.InboundClaimTypeMap.Clear();
    var key = Encoding.UTF8.GetBytes(jwtSettings.Value.SecretKey);
    var validationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(key),
      ValidIssuer = jwtSettings.Value.Issuer,
      ValidAudience = jwtSettings.Value.Audience,
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = false,
    };

    var principal = tokenHandler.ValidateToken(accessToken, validationParameters, out SecurityToken _);
    var userId = principal.FindFirst(JwtRegisteredClaimNames.Sub);

    return Guid.Parse(userId!.Value);
  }

  private string GenerateAccessToken(Guid userId, IEnumerable<RoleEnum> roles)
  {
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.SecretKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
      new(JwtRegisteredClaimNames.Sub, userId.ToString()),
      new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new(JwtRegisteredClaimNames.Iss, jwtSettings.Value.Issuer),
    };
    var roleList = roles.Select(r => new Claim("role", r.Value));
    claims.AddRange(roleList);

    var accessToken = new JwtSecurityToken(
      issuer: jwtSettings.Value.Issuer,
      audience: jwtSettings.Value.Audience,
      claims: claims,
      expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings.Value.ExpiryInMinutes)),
      signingCredentials: credentials
    );

    var tokenHandler = new JwtSecurityTokenHandler();
    tokenHandler.OutboundClaimTypeMap.Clear();
    return tokenHandler.WriteToken(accessToken);
  }

  private string GenerateRefreshToken()
  {
    return Guid.NewGuid().ToString("N");
  }
}
