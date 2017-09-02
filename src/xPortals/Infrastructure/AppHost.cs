using Autofac;
using Funq;
using ServiceStack;
using ServiceStack.Admin;
using ServiceStack.Api.Swagger;
using ServiceStack.Data;
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

            //Register Autofac IoC container adapter, so ServiceStack can use it
            container.Adapter = new AutofacIocAdapter(autoFacContainer);

            //This method scans the assembly for validators
            container.RegisterValidators(typeof(RegistrationValidator).Assembly);

            SetConfig(new HostConfig { UseCamelCase = false });

            Plugins.Add(new SwaggerFeature { UseBootstrapTheme = true });
            Plugins.Add(new PostmanFeature());
            Plugins.Add(new CorsFeature());

            //Plugins.Add(new RazorFormat());

            Plugins.Add(new AutoQueryFeature { MaxLimit = 100 });
            Plugins.Add(new AdminFeature());
            Plugins.Add(new ValidationFeature());


            using (var db = container.Resolve<IDbConnectionFactory>().Open())
            {
                //Create the PortalTempUser POCO table if it doesn't already exist
                db.CreateTableIfNotExists<PortalTempUser>();
            }
        }
    }
}
