using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StoreCS.Startup))]
namespace StoreCS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
