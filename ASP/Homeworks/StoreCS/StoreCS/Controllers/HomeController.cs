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
            var roles = context.Set<IdentityRole>()
                               .Select(x => x.Name)
                               .ToArray();


            var usersModels = context.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Email = x.Email,
                RoleId = context.Roles.FirstOrDefault(y => y.Id.Equals(x.Id)).Id
            });

            var adminModel = new AdminViewModel
            {
                Users = usersModels,
                Roles = roles
            };

            return View(adminModel);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult Admin(AdminViewModel model)
        {
            var m = model;

            return View();
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
    }
}