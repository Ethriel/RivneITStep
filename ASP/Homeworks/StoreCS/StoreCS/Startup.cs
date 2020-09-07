using Microsoft.Owin;
using Owin;
using StoreCS.Models;
using System.Data.Entity;

[assembly: OwinStartupAttribute(typeof(StoreCS.Startup))]
namespace StoreCS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            app.CreatePerOwinContext<DbContext>(() => new ApplicationDbContext());
        }
    }
}
