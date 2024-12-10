
using System.ComponentModel.DataAnnotations.Schema;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.Infrastructure.Data.Entities;

[Table("MusicianBands")]
public class MusicianBand
{
  public int MusicianId { get; set; }
  public Musician Musician { get; set; } = default!;
  public int BandId { get; set; }
  public Band Band { get; set; } = default!;
}
