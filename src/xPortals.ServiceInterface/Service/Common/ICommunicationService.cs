namespace xPortals.Service.Common
{
    public interface ICommunicationService
    {
        void SendSms(string phoneNumber, string message);
    }
}