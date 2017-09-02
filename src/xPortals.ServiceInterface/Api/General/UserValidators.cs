using ServiceStack.FluentValidation;
using xPortals.DTOs.General;

namespace xPortals.Api.General
{
    public class RegistrationValidator : AbstractValidator<Registration>
    {
        public RegistrationValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.PhoneNumber).NotEmpty();
        }
    }

    public class MobileVerificationValidator : AbstractValidator<MobileVerification>
    {
        public MobileVerificationValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.VerificationCode).NotEmpty();
        }
    }

    public class SetPasswordValidator : AbstractValidator<SetPassword>
    {
        public SetPasswordValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.ConfirmPassword).NotEmpty();
        }
    }
}
