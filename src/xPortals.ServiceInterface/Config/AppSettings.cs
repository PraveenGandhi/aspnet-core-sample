namespace xPortals.Config
{
    public class AppSettings
    {
        public Connections Connections { get; set; }
    }

    public class Connections
    {
        public string Database { get; set; }
        public string Crm { get; set; }
        public string SmsApi { get; set; }
    }
}
