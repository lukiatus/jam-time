using Ardalis.GuardClauses;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Endpoints.Authentication;
using JamTime.Backend.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace JamTime.Backend.Web.Services;

public class AuthService(IAuthenticator authenticator, ITokenService tokenService, AppDbContext dbContext)
  : IAuthService
{
  public async Task<TokenData> AuthenticateAsync(string idToken, CancellationToken ct = default)
  {
    var tokenPayload = await authenticator.AuthenticateAsync(idToken, ct);
    Guard.Against.Null(tokenPayload, nameof(tokenPayload));

    var user = await GetOrCreateUser(tokenPayload, authenticator.ProviderName, ct);
    var userRoleList = user.UserRoles.Select(ur => RoleEnum.FromValue(ur.Role)).ToList();
    var generatedTokens = tokenService.GenerateTokens(user.Id, userRoleList);
    user.RefreshToken = generatedTokens.RefreshToken;
    user.RefreshTokenValidUntil = generatedTokens.RefreshTokenExpirationTime;
    dbContext.Users.Update(user);
    await dbContext.SaveChangesAsync(ct);

    return generatedTokens;
  }

  public async Task<TokenData> ExchangeTokens(string accessToken, string refreshToken, CancellationToken ct = default)
  {
    var userId = tokenService.ValidateAccessTokenWithoutExpiration(accessToken);
    var user = await dbContext.Users.Include(u => u.UserRoles).SingleAsync(u => u.Id == userId, ct);

    var refreshTokenExpired = user.RefreshTokenValidUntil < DateTime.Now;
    if (refreshTokenExpired)
    {
      throw new SecurityTokenValidationException("Something went wrong while validating the tokens.");
      //TODO: ezt is szebben kellene lekezelni
    }

    var userRoleList = user.UserRoles.Select(ur => RoleEnum.FromValue(ur.Role)).ToList();
    var generatedTokens = tokenService.GenerateTokens(user.Id, userRoleList);
    user.RefreshToken = generatedTokens.RefreshToken;
    user.RefreshTokenValidUntil = generatedTokens.RefreshTokenExpirationTime;
    dbContext.Users.Update(user);
    await dbContext.SaveChangesAsync(ct);

    return generatedTokens;
  }

  private async Task<User> GetOrCreateUser(TokenPayload payload, string authenticatorProviderName, CancellationToken ct)
  {
    var user = await dbContext.Users.Include(u => u.UserRoles).SingleOrDefaultAsync(
      u => u.ExternalId == payload.ExternalId && u.ExternalProvider == authenticatorProviderName, ct);
    if (user != null)
    {
      return user;
    }

    var musician = await dbContext.Musicians.AddAsync(new Musician(payload.Name ?? string.Empty), ct);
    await dbContext.SaveChangesAsync(ct);

    user = new User
    {
      MusicianId = musician.Entity.Id,
      ExternalId = payload.ExternalId,
      ExternalProvider = authenticatorProviderName,
      Email = payload.Email,
      UserRoles = [new UserRole { UserId = Guid.Empty, Role = RoleEnum.User }]
    };

    // Auto grant admin role to the first user of the application
    if (!dbContext.Users.Any())
    {
      user.UserRoles.Add(new UserRole { UserId = Guid.Empty, Role = RoleEnum.Admin });
    }

    await dbContext.Users.AddAsync(user, ct);
    await dbContext.SaveChangesAsync(ct);

    return user;
  }
}
