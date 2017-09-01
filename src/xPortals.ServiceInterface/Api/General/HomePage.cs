using ServiceStack;
using xPortals.DTOs.General;

namespace xPortals.Api.General
{
    public class HomePage //: BaseServiceStackApi
    {
        public object Get(Home request)
        {

            return new HttpResult("<h1>Hello Gopal</h1>", "text/html");
        }
    }
}
