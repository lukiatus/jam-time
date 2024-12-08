using JamTime.Backend.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JamTime.Backend.Infrastructure.Data;

public static class SeedData
{
  public static readonly Setting SystemMessageSetting = new Setting {Key = "SystemMessage", Value = null};
  
  public static async Task InitializeAsync(AppDbContext dbContext, CancellationToken ct = default)
  {
    await Task.CompletedTask;
    
    if (await dbContext.Settings.AnyAsync(ct)) return; // database already seeded

    await PopulateDataAsync(dbContext);
  }

  public static async Task PopulateDataAsync(AppDbContext dbContext)
  {
    dbContext.Settings.Add(SystemMessageSetting);
    await dbContext.SaveChangesAsync();
  }
}
