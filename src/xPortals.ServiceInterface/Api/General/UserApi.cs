using ServiceStack;
using ServiceStack.OrmLite;
using xPortals.DomainObjects.General;
using xPortals.DTOs.General;
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
        public object Any(RegistrationStep1 request)
        {
            var serviceRequest = new PortalTempUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email
            };
            var response = UserService.Register(serviceRequest);
            return new RegistrationStep1Response
            {
                PortalTempUser = response
            };
        }

        public MobileVerificationResponse Post(MobileVerificationRequest request)
        {
            var user = Db.SingleById<PortalTempUser>(request.Id);
            if (!user.MobileVerificationCode.Equals(request.VerificationCode))
            {
                return new MobileVerificationResponse
                {
                    ResponseStatus = new ResponseStatus
                    {
                        ErrorCode = "404",
                        Message = "Invalid code"
                    }
                };
            }
            return new MobileVerificationResponse { FullName = user.FullName };
        }

        public bool Post(SetPasswordRequest request)
        {
            var user = Db.SingleById<PortalTempUser>(request.Id);
            user.Username = request.Username;
            var count = Db.Update(user, u => u.Id == request.Id);
            return count > 0;
        }
    }
}
