using ServiceStack;
using xPortals.DTOs.Base;

namespace xPortals.DTOs.General
{
    public class MobileVerificationRequest :IReturn<MobileVerificationResponse>
    {
        public long Id { get; set; }
        public string VerificationCode { get; set; }
    }

    public class MobileVerificationResponse: WithStatus
    {
        public string FullName { get; set; }
    }
}
