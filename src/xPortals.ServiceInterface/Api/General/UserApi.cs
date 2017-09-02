using ServiceStack.OrmLite;
using xPortals.DomainObjects.General;
using xPortals.DTOs.General;
using xPortals.Exceptions.General;
using xPortals.Service.General;

namespace xPortals.Api.General
{
    public class UserApi : BaseServiceStackApi
    {
        public IUserService UserService { get; set; }

        public UserApi(IUserService userService)
        {
            UserService = userService;
        }
        public object Any(Registration request)
        {
            var serviceRequest = new PortalTempUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email
            };
            var response = UserService.Register(serviceRequest);
            return new RegistrationResponse
            {
                PortalTempUser = response
            };
        }

        public MobileVerificationResponse Post(MobileVerification request)
        {
            var user = Db.SingleById<PortalTempUser>(request.Id);
            if (!user.MobileVerificationCode.Equals(request.VerificationCode))
            {
                throw new InvalidVerificationCode("Invalid code");
            }
            return new MobileVerificationResponse { FullName = user.FullName };
        }

        public SetPasswordResponse Post(SetPassword request)
        {
            var user = Db.SingleById<PortalTempUser>(request.Id);
            user.Username = request.Username;
            var count = Db.Update(user, u => u.Id == request.Id);
            return new SetPasswordResponse { IsDone = count > 0 };
        }
    }
}
