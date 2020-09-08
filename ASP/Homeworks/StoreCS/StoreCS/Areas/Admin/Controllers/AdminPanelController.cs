using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Areas.Admin.Models;
using StoreCS.Entity;
using StoreCS.Helpers;
using StoreCS.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace StoreCS.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminPanelController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly ApplicationUserManager userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public AdminPanelController()
        {
            context = new ApplicationDbContext();
            userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));
            roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
        }
        public ActionResult Index()
        {
            var adminModel = ModelHelper.GetAdminViewModel(context, roleManager);

            return View(adminModel);
        }

        [HttpPost]
        public async Task<ActionResult> Index(string id, string role)
        {
            var user = context.Users
                              .FirstOrDefault(x => x.Id.Equals(id));

            var currentRoleId = context.Set<IdentityUserRole>()
                                       .FirstOrDefault(x => x.UserId.Equals(id))
                                       .RoleId;

            var currentRole = roleManager.FindById(currentRoleId).Name;

            var removeResult = await userManager.RemoveFromRoleAsync(user.Id, currentRole);

            var addResult = await userManager.AddToRoleAsync(user.Id, role);

            var adminModel = ModelHelper.GetAdminViewModel(context, roleManager);

            return View(adminModel);
        }

        [HttpGet]
        public ActionResult CreateRole()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateRole(CreateRoleViewModel model)
        {
            var role = new IdentityRole(model.Name);

            var result = roleManager.Create(role);

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult CreateCategory()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateCategory(CreateCategoryViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var category = new Category { Name = model.Name };

            context.Categories.Add(category);

            context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult ListRoles()
        {
            var models = ModelHelper.GetRoleViewModels(context);

            return View(models);
        }

        [HttpPost]
        public async Task<ActionResult> RemoveRole(string id)
        {
            var role = await roleManager.FindByIdAsync(id);

            var deleteResult = await roleManager.DeleteAsync(role);

            return RedirectToAction(nameof(ListRoles));
        }

        [HttpGet]
        public ActionResult ListCategories()
        {
            var models = ModelHelper.GetCategoryViewModels(context);

            return View(models);
        }

        [HttpPost]
        public async Task<ActionResult> RemoveCategory(int id)
        {
            var category = context.Categories
                                  .FirstOrDefault(x => x.Id.Equals(id));

            context.Categories
                   .Remove(category);

            var res = await context.SaveChangesAsync();

            return RedirectToAction(nameof(ListCategories));
        }
    }
}