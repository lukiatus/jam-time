using FastEndpoints;
using FluentValidation;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.Web.Endpoints.Reservations.Edit;

public class EditReservationValidator: Validator<ReservationDTO>
{
  public EditReservationValidator()
  {
    RuleFor(x => x.Remark)
      .MaximumLength(50);
    
    RuleFor(x => x.Band)
      .NotEmpty();

    RuleFor(x => x.From)
      .NotEmpty()
      .GreaterThan(DateTime.Now);
    
    RuleFor(x => x.To)
      .NotEmpty()
      .GreaterThan(DateTime.Now);

    RuleFor(x => x.Room)
      .NotEmpty();
  }
}
