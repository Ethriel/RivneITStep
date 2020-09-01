using GameStoreUI.Utilities;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace GameStoreUI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutofacConfiguration.ConfigureAutofac();

            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
