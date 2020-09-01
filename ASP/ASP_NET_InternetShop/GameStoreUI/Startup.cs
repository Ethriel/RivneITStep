using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;
using GameStoreDAL;
using System.Data.Entity;

[assembly: OwinStartup(typeof(GameStoreUI.Startup))]

namespace GameStoreUI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie
            });

            app.CreatePerOwinContext<DbContext>(() => new ApplicationContext());
        }
    }
}
