using FastEndpoints;
using FluentValidation;

namespace JamTime.Backend.Web.Endpoints.Bands.Create;

public class CreateBandValidator : Validator<CreateBandRequest>
{
  public CreateBandValidator()
  {
    RuleFor(x => x.Name)
      .NotEmpty()
      .MaximumLength(100);
    RuleFor(x => x.LeaderMusicianId)
      .NotEmpty();
    RuleFor(x => x.Members)
      .NotEmpty();
  }
}
