using ServiceStack;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using xPortals.Config;

namespace xPortals.Service.Common
{
    public class CommunicationService : ICommunicationService
    {
        private string smsApiURL;
        private string smsApiUsername;
        private string smsApiPassword;

        public CommunicationService(AppSettings settings)
        {
            ExtractSmsApiDetails(settings.Connections.SmsApi);
        }

        public void SendSms(string phoneNumber,string message)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var smsRequest = new { from = "DSOA", to = phoneNumber, text = message };
            var jsonInString = smsRequest.ToJson();
            var content = new StringContent(jsonInString, Encoding.UTF8, "application/json");
            var byteArray = Encoding.ASCII.GetBytes($"{smsApiUsername}:{smsApiPassword}");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            var smsApiResponse = client.PostAsync(smsApiURL, content);
            //var result = smsApiResponse.Result;
        }

        private void ExtractSmsApiDetails(string connectionString)
        {
            try
            {
                var arr = connectionString.Split(';');
                smsApiUsername = arr.Where(p => p.Contains("username")).Select(p => p.Split('=')[1]).FirstOrDefault();
                smsApiPassword = arr.Where(p => p.Contains("password")).Select(p => p.Split('=')[1]).FirstOrDefault();
                smsApiURL = arr.Where(p => p.Contains("url")).Select(p => p.Split('=')[1]).FirstOrDefault();
            }
            catch
            {

            }
        }
    }
}
