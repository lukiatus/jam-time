using Ardalis.SmartEnum;

namespace JamTime.Backend.UseCases.Enums;

[SmartEnumStringComparer(StringComparison.InvariantCultureIgnoreCase)]
public sealed class RoleEnum : SmartEnum<RoleEnum, string>
{
  public static readonly RoleEnum Admin = new(nameof(Admin), "admin");
  public static readonly RoleEnum BandLeader = new(nameof(BandLeader), "band-leader");
  public static readonly RoleEnum User = new(nameof(User), "user");

  private RoleEnum(string name, string value) : base(name, value)
  {
  }
}
