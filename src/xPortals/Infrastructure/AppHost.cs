using Autofac;
using Funq;
using ServiceStack;
using ServiceStack.Admin;
using ServiceStack.Api.Swagger;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Data;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.Validation;
using xPortals.Api.General;
using xPortals.DomainObjects.General;

namespace xPortals.Infrastructure
{
    public class AppHost : AppHostBase
    {
        private IContainer autoFacContainer;

        /// <summary>
        /// Default constructor.
        /// Base constructor requires a name and assembly to locate web service classes.
        /// </summary>
        public AppHost(IContainer container)
            : base("xPortalsApis", typeof(UserApi).GetAssembly())
        {
            autoFacContainer = container;
        }

        /// <summary>
        /// Application specific configuration
        /// This method should initialize any IoC resources utilized by your web service classes.
        /// </summary>
        public override void Configure(Container container)
        {
            //Console.WriteLine
            LogManager.LogFactory = new ConsoleLogFactory(debugEnabled: true);

            container.Register<IAuthRepository>(c =>
            new OrmLiteAuthRepository(container.Resolve<IDbConnectionFactory>())
            {
                UseDistinctRoleTables = true
            });

            //Create UserAuth RDBMS Tables
            container.Resolve<IAuthRepository>().InitSchema();

            //Also store User Sessions in SQL Server
            container.RegisterAs<OrmLiteCacheClient, ICacheClient>();
            container.Resolve<ICacheClient>().InitSchema();
            container.RegisterAs<OrmLiteAuthRepository, IUserAuthRepository>();

            //Register Autofac IoC container adapter, so ServiceStack can use it
            container.Adapter = new AutofacIocAdapter(autoFacContainer);

            //This method scans the assembly for validators
            container.RegisterValidators(typeof(Api.General.RegistrationValidator).Assembly);

            SetConfig(new HostConfig { UseCamelCase = true });

            Plugins.Add(new SwaggerFeature { UseBootstrapTheme = true });
            Plugins.Add(new PostmanFeature());
            Plugins.Add(new CorsFeature());

            //Plugins.Add(new RazorFormat());

            Plugins.Add(new AutoQueryFeature { MaxLimit = 100 });
            Plugins.Add(new AdminFeature());
            Plugins.Add(new ValidationFeature());

            //Plugins.Add(new RegistrationFeature());

            //Add Support for
            Plugins.Add(new AuthFeature(() => new AuthUserSession(),
                new IAuthProvider[] {
                    new JwtAuthProvider(AppSettings) { AuthKey = AesUtils.CreateKey(),RequireSecureConnection=false },
                    new ApiKeyAuthProvider(AppSettings),        //Sign-in with API Key
                    new CredentialsAuthProvider(),              //Sign-in with UserName/Password credentials
                    new BasicAuthProvider(),                    //Sign-in with HTTP Basic Auth
                    new DigestAuthProvider(AppSettings),        //Sign-in with HTTP Digest Auth
                    new TwitterAuthProvider(AppSettings),       //Sign-in with Twitter
                    new FacebookAuthProvider(AppSettings),      //Sign-in with Facebook
                    //new YahooOpenIdOAuthProvider(AppSettings),  //Sign-in with Yahoo OpenId
                    //new OpenIdOAuthProvider(AppSettings),       //Sign-in with Custom OpenId
                    //new GoogleOAuth2Provider(AppSettings),      //Sign-in with Google OAuth2 Provider
                    //new LinkedInOAuth2Provider(AppSettings),    //Sign-in with LinkedIn OAuth2 Provider
                    //new GithubAuthProvider(AppSettings),        //Sign-in with GitHub OAuth Provider
                    //new YandexAuthProvider(AppSettings),        //Sign-in with Yandex OAuth Provider
                    //new VkAuthProvider(AppSettings),            //Sign-in with VK.com OAuth Provider
                }));

            using (var db = container.Resolve<IDbConnectionFactory>().Open())
            {
                //Create the PortalTempUser POCO table if it doesn't already exist
                db.CreateTableIfNotExists<PortalTempUser>();
            }
        }
    }
}