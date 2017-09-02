using ServiceStack;

namespace xPortals.DTOs.General
{
    public class MobileVerification :IReturn<MobileVerificationResponse>
    {
        public long Id { get; set; }
        public string VerificationCode { get; set; }
    }

    public class MobileVerificationResponse
    {
        public string FullName { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}
