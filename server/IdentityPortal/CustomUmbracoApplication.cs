using System;
using System.Web.Mvc;
using System.Web.Routing;
using Umbraco.Core;
using Umbraco.Web;

namespace UmbracoChallenge
{
    public class CustomUmbracoApplication : UmbracoApplication
    {
        protected override IBootManager GetBootManager()
        {
            return new CustomWebBootManager(this);
        }
    }

    class CustomWebBootManager : WebBootManager
    {
        // ctor
        public CustomWebBootManager(UmbracoApplicationBase umbracoApplication)
            : base(umbracoApplication)
        {
        }

        public override IBootManager Complete(Action<ApplicationContext> afterComplete)
        {
            // add route for api
            RouteTable.Routes.MapRoute("FormApi", "api/values", new { controller = "Values", action = "Get" });
            // add route for mvc
            RouteTable.Routes.MapRoute("HomePage", "home/index", new { controller = "Home", action = "Index" });
            return base.Complete(afterComplete);
        }
    }
}