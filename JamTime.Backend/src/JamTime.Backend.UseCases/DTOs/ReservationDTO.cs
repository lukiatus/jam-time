using JamTime.Backend.Core.Enums;
  
namespace JamTime.Backend.UseCases.DTOs;

public class ReservationDTO
{
  public int Id { get; init; }
  public BandDTO Band { get; init; } = default!;
  public DateTime From { get; init; }
  public DateTime To { get; init; }
  public RoomDTO Room { get; init; } = default!;
  public string? Remark { get; init; }
  public required ReservationStatus Status { get; init; }
}
