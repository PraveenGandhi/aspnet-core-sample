using ServiceStack;
using xPortals.DomainObjects.General;
using xPortals.DTOs.Base;

namespace xPortals.DTOs.General
{
    public class Registration : IReturn<RegistrationResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class RegistrationResponse: WithStatus
    {
        public PortalTempUser PortalTempUser { get; set; }
    }
}
