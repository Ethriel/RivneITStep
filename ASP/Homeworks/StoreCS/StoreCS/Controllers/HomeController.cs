using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Helpers;
using StoreCS.Models;
using System.Linq;
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
            //var userId = User.Identity.GetUserId();

            //if (userId != null)
            //{
            //    var roleId = context.Set<IdentityUserRole>()
            //                    .FirstOrDefault(x => x.UserId.Equals(userId)).RoleId;

            //    var role = context.Roles.FirstOrDefault(x => x.Id.Equals(roleId));

            //    if (role.Name.Equals("Admin"))
            //    {
            //        return RedirectToAction("Index", "AdminPanel", new { area = "Admin" });
            //    }
            //    else if (role.Name.Equals("Manager"))
            //    {
            //        return RedirectToAction("Index", "ManagerPanel", new { area = "Manager" });
            //    }
            //}

            var models = ModelHelper.GetNewsViewModels(context, Request);

            return View(models);
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