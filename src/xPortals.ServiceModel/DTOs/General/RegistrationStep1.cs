using ServiceStack;
using xPortals.DomainObjects.General;
using xPortals.DTOs.Base;

namespace xPortals.DTOs.General
{
    [Route("/registration/step1")]
    public class RegistrationStep1 : IReturn<RegistrationStep1Response>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class RegistrationStep1Response: WithStatus
    {
        public PortalTempUser PortalTempUser { get; set; }
    }
}
