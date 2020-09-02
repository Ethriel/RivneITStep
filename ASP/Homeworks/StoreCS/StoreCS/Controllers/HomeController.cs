using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StoreCS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly ApplicationUserManager userManager;
        public HomeController()
        {
            context = new ApplicationDbContext();
            userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));
        }
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Admin()
        {
            var adminModel = GetAdminViewModel();

            return View(adminModel);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult Admin(string id, string role)
        {
            var user = context.Users
                              .FirstOrDefault(x => x.Id.Equals(id));

            var newRole = context.Roles
                                 .FirstOrDefault(x => x.Name.Equals(role));

            var identityUserRoles = context.Set<IdentityUserRole>();

            var identityUserRole = identityUserRoles.FirstOrDefault(x => x.UserId.Equals(user.Id));

            identityUserRoles.Remove(identityUserRole);

            user.Roles.Clear();

            context.SaveChanges();

            var newIdentityUserRole = new IdentityUserRole { RoleId = newRole.Id, UserId = user.Id };

            identityUserRoles.Add(identityUserRole);

            user.Roles.Add(identityUserRole);

            context.SaveChanges();

            var adminModel = GetAdminViewModel();

            return View(adminModel);
        }

        [Authorize]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        private AdminViewModel GetAdminViewModel()
        {
            var roles = GetRoles();

            var usersModels = GetUserViewModels();

            var adminModel = new AdminViewModel
            {
                Users = usersModels,
                Roles = roles
            };

            return adminModel;
        }

        private IEnumerable<string> GetRoles()
        {
            var roles = context.Set<IdentityRole>()
                               .Select(x => x.Name)
                               .ToArray();

            return roles;
        }

        private IEnumerable<UserViewModel> GetUserViewModels()
        {
            var usersModels = context.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Email = x.Email,
                RoleId = context.Set<IdentityUserRole>().FirstOrDefault(y => y.UserId.Equals(x.Id)).RoleId,
            }).Where(y => y.RoleId != null).ToList();

            foreach (var user in usersModels)
            {
                user.Role = context.Roles.FirstOrDefault(x => x.Id.Equals(user.RoleId)).Name;
            }

            return usersModels;
        }
    }
}