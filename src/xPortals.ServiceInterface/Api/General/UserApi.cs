using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.OrmLite;
using xPortals.DomainObjects.General;
using xPortals.DTOs.General;
using xPortals.Exceptions.General;
using xPortals.Service.General;

namespace xPortals.Api.General
{
    public class UserApi : BaseServiceStackApi
    {
        private IUserService userService;
        private IAuthRepository authRepository;

        public UserApi(IUserService userService, IAuthRepository authRepository)
        {
            this.userService = userService;
            this.authRepository = authRepository;
        }

        public object Any(Registration request)
        {
            var serviceRequest = request.ConvertTo<PortalTempUser>();
            var response = userService.Register(serviceRequest);
            return new RegistrationResponse { PortalTempUser = response };
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
            user.UserName = request.Username;
            var count = Db.Update(user, u => u.Id == request.Id);
            var authSession = user.ConvertTo<UserAuth>();
            authRepository.CreateUserAuth(authSession, request.Password);
            return new SetPasswordResponse { IsDone = count > 0 };
        }
    }
}