using ServiceStack.FluentValidation;
using xPortals.DTOs.Leasing;

namespace xPortals.Api.Leasing
{
    public class LeaseTerminationValidator : AbstractValidator<LeaseTermination>
    {
        public LeaseTerminationValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
        }
    }

    public class LeaseTerminationPostValidator : AbstractValidator<LeaseTerminationPost>
    {
        public LeaseTerminationPostValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Reason).NotEmpty();
            RuleFor(x => x.TerminationDate).NotEmpty();
        }
    }
}