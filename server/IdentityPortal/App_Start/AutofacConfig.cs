using Autofac;
using Umbraco.Core.Services;

namespace UmbracoChallenge.App_Start
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            // Register Service
            builder.RegisterType<UserService>().As<IUserService>().SingleInstance();
        }
    }
}