using ServiceStack.Data;
using ServiceStack.OrmLite;
using System;
using xPortals.Service.Common;
using xPortals.DomainObjects.General;

namespace xPortals.Service.General
{
    public class UserService : IUserService
    {
        private IDbConnectionFactory dbConnectionFactory;
        private ICommunicationService communicationService;

        public UserService(IDbConnectionFactory dbConnectionFactory,ICommunicationService communicationService)
        {
            this.dbConnectionFactory = dbConnectionFactory;
            this.communicationService = communicationService;
        }

        public PortalTempUser Register(PortalTempUser portalUser)
        {
            portalUser.Id = Guid.NewGuid();
            portalUser.MobileVerificationCode = portalUser.Id.ToString().Substring(0, 6);
            portalUser.MobileVerificationExpiryAt = DateTime.Now.AddMinutes(5);
            using (var db = dbConnectionFactory.Open())
            {
                db.Insert(portalUser);
            }
            var message = $"Hello {portalUser.FirstName} {portalUser.LastName},\n\tYour Security code is {portalUser.MobileVerificationCode}";
            communicationService.SendSms(phoneNumber: portalUser.PhoneNumber,message: message);
            return portalUser;
        }
    }
}
