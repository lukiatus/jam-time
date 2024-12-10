using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Interfaces;

public interface IUserService
{
  Task<UserDTO> CreateNewUserAsync(string externalId, string externalProvider, CancellationToken ct = default);
  Task<UserDTO?> GetUserByExternalId(string externalId, string externalProvider, CancellationToken ct = default);
  Task<IEnumerable<string>> GetRolesByEmailAsync(string email, CancellationToken ct = default);
}
