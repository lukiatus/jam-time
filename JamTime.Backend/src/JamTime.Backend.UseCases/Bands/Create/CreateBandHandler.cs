using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Bands.Create;

public class CreateBandHandler(IRepository<Band> repository, IReadRepository<Musician> musicianRepository)
  : ICommandHandler<CreateBandCommand, Result<BandDetailsDTO>>
{
  public async Task<Result<BandDetailsDTO>> Handle(CreateBandCommand req, CancellationToken ct)
  {
    var band = new Band(req.Name, req.LeaderMusicianId);
    var result = await repository.AddAsync(band, ct);
    var musician = await musicianRepository.GetByIdAsync(result.LeaderMusicianId, ct);

    return new BandDetailsDTO { Id = result.Id, Name = result.Name, LeaderName = musician!.Name };
  }
}
