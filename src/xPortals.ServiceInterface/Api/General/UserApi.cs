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
    }
}
