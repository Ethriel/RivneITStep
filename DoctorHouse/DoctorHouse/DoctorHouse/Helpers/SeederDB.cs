using DoctorHouse.Constants;
using DoctorHouse.DLL.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DoctorHouse.Helpers
{
    public class SeederDB
    {
        public static void SeedData(UserManager<DbUser> userManager,
                   RoleManager<DbRole> roleManager)
        {
            CreateUpdateRole(roleManager, Roles.Admin);
            CreateUpdateRole(roleManager, Roles.Doctor);
            CreateUpdateRole(roleManager, Roles.Client);

            AddToRole(userManager, "admin@gmail.com", "Qwerty1-", Roles.Admin);
            AddToRole(userManager, "doctor@gmail.com", "Qwerty1-", Roles.Doctor);
            AddToRole(userManager, "user@gmail.com", "Qwerty1-", Roles.Client);
        }
        private static void CreateUpdateRole(RoleManager<DbRole> roleManager, string role)
        {
            var roleResult = roleManager.FindByNameAsync(role).Result;
            if (roleResult == null)
            {
                var roleresult = roleManager.CreateAsync(new DbRole
                {
                    Name = role

                }).Result;
            }
        }
        private static void AddToRole(UserManager<DbUser> userManager, string email, string password, string role)
        {
            var findUser = userManager.FindByEmailAsync(email).Result;
            if (findUser == null)
            {
                var user = new DbUser
                {
                    Email = email,
                    UserName = email
                };

                var result = userManager.CreateAsync(user, password).Result;
                result = userManager.AddToRoleAsync(user, role).Result;
            }
        }
        public static void SeedDataByAS(IServiceProvider services)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                SeedData(manager, managerRole);
            }
        }
    }
}
