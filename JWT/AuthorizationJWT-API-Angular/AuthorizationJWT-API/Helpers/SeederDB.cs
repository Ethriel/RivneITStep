using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AuthorizationJWT_API.Helpers
{
    public class SeederDB
    {
        public static void SeedData(IServiceProvider services,
              IWebHostEnvironment env,
              IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                SeedUsers(manager, managerRole);
            }
        }
        private static void SeedUsers(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;

            }


            string email = "admin@gmail.com";
            var admin = new AppUser
            {
                Email = email,
                UserName = email
            };
            var andrii = new AppUser
            {
                Email = "user@gmail.com",
                UserName = "user@gmail.com"
            };

            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

            var resultUser = userManager.CreateAsync(andrii, "Qwerty1-").Result;
            resultUser = userManager.AddToRoleAsync(andrii, "User").Result;
        }
    }
}
