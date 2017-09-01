using xPortals.DomainObjects.General;

namespace xPortals.Service.General
{
    public interface IUserService
    {
        PortalTempUser Register(PortalTempUser input);
    }
}
