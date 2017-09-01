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
            portalUser.MobileVerificationCode = Guid.NewGuid().ToString().Substring(0, 6);
            portalUser.MobileVerificationExpiryAt = DateTime.Now.AddMinutes(5);
            using (var db = dbConnectionFactory.Open())
            {
                portalUser.Id = db.Insert(portalUser,true);
            }
            var message = $"Hello {portalUser.FirstName} {portalUser.LastName},\n\tYour Security code is {portalUser.MobileVerificationCode}";
            communicationService.SendSms(phoneNumber: portalUser.PhoneNumber,message: message);
            return portalUser;
        }
    }
}
