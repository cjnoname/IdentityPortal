using IdentityPortal.Interfaces;
using IdentityPortal.Services;
using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace IdentityPortal
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IDocumentService, DocumentService>();
            container.RegisterType<IAuthService, AuthService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}