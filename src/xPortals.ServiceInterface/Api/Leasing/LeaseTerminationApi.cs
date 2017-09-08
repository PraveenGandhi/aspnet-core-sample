using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Logging;
using System;
using xPortals.DTOs.Leasing;

namespace xPortals.Api.Leasing
{
    [Authenticate]
    public class LeaseTerminationApi : BaseServiceStackApi
    {
        private ILog log = LogManager.GetLogger(typeof(LeaseTerminationApi));

        public object Get(LeaseTermination request)
        {
            IAuthSession session = GetSession();
            log.Debug(session.UserAuthId);
            log.Debug(session.Email);
            return new LeaseTerminationResponse() { LeaseExpiryDate = DateTime.Now.AddYears(1) };
        }

        public object Post(LeaseTerminationPost request)
        {
            IAuthSession session = GetSession();
            log.Debug(session.UserAuthId);
            log.Debug(session.Email);
            return new LeaseTerminationResponse() { LeaseExpiryDate = DateTime.Now.AddYears(1) };
        }
    }
}