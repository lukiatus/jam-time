using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JamTime.Backend.Infrastructure.Data.Configurations;

public class UserRoleConfiguration: IEntityTypeConfiguration<UserRole>
{
  public void Configure(EntityTypeBuilder<UserRole> builder)
  {
    builder
      .HasKey(ur => new { ur.UserId, RoleName = ur.Role });
  }
}
