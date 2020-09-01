using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System.Data.Entity;

namespace GameStoreUI.Utilities
{
    public class AppUserManager : UserManager<IdentityUser>
    {
        public AppUserManager(IUserStore<IdentityUser> store) : base(store)
        {

        }

        public static AppUserManager Create(IdentityFactoryOptions<AppUserManager> options, IOwinContext owinContext)
        {
            var dbContext = owinContext.Get<DbContext>();

            var manager = new AppUserManager(new UserStore<IdentityUser>(dbContext));

            manager.UserValidator = new UserValidator<IdentityUser>(manager)
            {
                RequireUniqueEmail = true,
                AllowOnlyAlphanumericUserNames = true,
            };

            manager.PasswordValidator = new PasswordValidator
            {
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
                RequireNonLetterOrDigit = true,
                RequiredLength = 6
            };



            return manager;
        }
    }
}