using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using System;
using System.Linq;
using xPortals.Config;
using xPortals.Service.General;

namespace xPortals.Infrastructure
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public IContainer ApplicationContainer { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Added - uses IOptions<T> for your settings.
            services.AddOptions();

            // Added - Confirms that we have a home for our DemoSettings
            services.Configure<AppSettings>(Configuration.GetSection("xPortals"));

            // Create the container builder.
            var builder = new ContainerBuilder();

            // Register dependencies, populate the services from
            // the collection, and build the container. If you want
            // to dispose of the container at the end of the app,
            // be sure to keep a reference to it as a property or field.
            //
            // Note that Populate is basically a foreach to add things
            // into Autofac that are in the collection. If you register
            // things in Autofac BEFORE Populate then the stuff in the
            // ServiceCollection can override those things; if you register
            // AFTER Populate those registrations can override things
            // in the ServiceCollection. Mix and match as needed.
            builder.Populate(services);
            //builder.RegisterType<MyType>().As<IMyType>();

            // Register All Controllers In The Current Scope
            //builder.RegisterControllers(AppDomain.CurrentDomain.GetAssemblies());

            var ourAssemblies = AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.FullName.Contains(nameof(xPortals)))
                .ToList();
            ourAssemblies.Add(typeof(UserService).Assembly);
            var fullnames = AppDomain.CurrentDomain.GetAssemblies().Select(a => a.FullName).ToList().OrderByDescending(x => x);
            var types = ourAssemblies.FirstNonDefault().DefinedTypes;
            // Register all services of xPortals as Single Instances
            builder.RegisterAssemblyTypes(ourAssemblies.ToArray())
                .Where(t => t.Name.EndsWith("Service", StringComparison.Ordinal))
                .AsImplementedInterfaces()
                .SingleInstance();

            builder.Register(c =>
            {
                return c.Resolve<Microsoft.Extensions.Options.IOptions<AppSettings>>().Value;
            }).As<AppSettings>().SingleInstance();

            builder.Register<IDbConnectionFactory>(c =>
            {
                var settings = c.Resolve<AppSettings>();
                return new OrmLiteConnectionFactory(settings.Connections.Database, SqlServerDialect.Provider);
            });

            ApplicationContainer = builder.Build();

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Configure is where you add middleware. This is called after
        // ConfigureServices. You can use IApplicationBuilder.ApplicationServices
        // here if you need to resolve things from the container.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime appLifetime)
        {
            if (env.IsDevelopment())
            {
                app.
                    UseDeveloperExceptionPage().
                    UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                    {
                        HotModuleReplacement = true
                    });
            }

            app.UseStaticFiles();

            app.UseServiceStack(new AppHost(ApplicationContainer));

            // If you want to dispose of resources that have been resolved in the
            // application container, register for the "ApplicationStopped" event.
            // You can only do this if you have a direct reference to the container,
            // so it won't work with the above ConfigureContainer mechanism.
            appLifetime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}