using ServiceStack.DataAnnotations;
using System;

namespace xPortals.DomainObjects.General
{
    public class PortalTempUser
    {
        [PrimaryKey]
        [AutoIncrement]
        public long Id { get; set; }

        public string RequestIP { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string MobileVerificationCode { get; set; }
        public DateTime? MobileVerificationExpiryAt { get; set; }
        public bool IsMobileVerified { get; set; }

        public string EmailVerificationCode { get; set; }
        public DateTime? EmailVerificationExpiryAt { get; set; }
        public bool IsEmailVerified { get; set; }

        public string FullName { get { return $"{FirstName} {LastName}"; } }
    }
}