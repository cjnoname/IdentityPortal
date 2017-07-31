using System;
using System.Web.Http;
using Umbraco.Web;
using IdentityPortal.App_Start;
using UmbracoChallenge.Attributes;

namespace IdentityPortal
{
    public class WebApplication : UmbracoApplication
    {
        protected override void OnApplicationStarting(object sender, EventArgs e)
        {
            base.OnApplicationStarting(sender, e);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Filters.Add(new CustomAuthenticationAttribute());
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            UnityConfig.RegisterComponents();
        }
    }
}