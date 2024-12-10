using FastEndpoints;
using FluentValidation;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.Web.Endpoints.Bands.Edit;

public class EditBandValidator : Validator<EditBandRequest>
{
  public EditBandValidator()
  {
    RuleFor(x => x.BandId)
      .NotEmpty()
      .NotNull();
    
    RuleFor(x => x.Name)
      .NotEmpty()
      .MaximumLength(100);
    
    RuleFor(x => x.LeaderMusicianId)
      .NotEmpty();
    
    RuleFor(x => x.Members)
      .NotEmpty();
  }
}
