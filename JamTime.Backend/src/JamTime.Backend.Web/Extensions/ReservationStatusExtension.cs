using JamTime.Backend.Core.Enums;

namespace JamTime.Backend.Web.Extensions;

public static class ReservationStatusExtension
{
  public static string ToLocalizedString(this ReservationStatus status)
  {
    return status switch
    {
      ReservationStatus.Accepted => "Elfogadott",
      ReservationStatus.Deleted => "Törölt",
      ReservationStatus.Rejected => "Elutasított",
      _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
    };
  }
}
