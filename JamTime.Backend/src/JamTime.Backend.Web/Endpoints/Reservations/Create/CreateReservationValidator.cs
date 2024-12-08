using FastEndpoints;
using FluentValidation;

namespace JamTime.Backend.Web.Endpoints.Reservations.Create;

public class CreateReservationValidator : Validator<CreateReservationRequest>
{
  public CreateReservationValidator()
  {
    RuleFor(x => x.Remark)
      .MaximumLength(50);

    RuleFor(x => x.From)
      .NotEmpty()
      .GreaterThan(DateTime.Now);
    
    RuleFor(x => x.To)
      .NotEmpty()
      .GreaterThan(DateTime.Now);

    RuleFor(x => x.BandId)
      .NotEmpty();

    RuleFor(x => x.RoomId)
      .NotEmpty();
  }
}
