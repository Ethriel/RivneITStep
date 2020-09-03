using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Areas.Admin.Models;
using StoreCS.Entity;
using StoreCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
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
            var adminModel = GetAdminViewModel();

            return View(adminModel);
        }

        [HttpPost]
        public async Task<ActionResult> Index(string id, string role)
        {
            var user = context.Users
                              .FirstOrDefault(x => x.Id.Equals(id));

            var currentRoleId = context.Set<IdentityUserRole>().FirstOrDefault(x => x.UserId.Equals(id)).RoleId;

            var currentRole = roleManager.FindById(currentRoleId).Name;

            var removeResult = await userManager.RemoveFromRoleAsync(user.Id, currentRole);

            var addResult = await userManager.AddToRoleAsync(user.Id, role);

            var adminModel = GetAdminViewModel();

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
            var roles = context.Roles.ToArray();

            var models = roles.Select(x => new RoleViewModel
            {
                Id = x.Id,
                Name = x.Name
            });

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
            var categories = context.Categories.ToArray();

            var models = categories.Select(x => new CategoryViewModel
            {
                Id = x.Id,
                Name = x.Name
            });

            return View(models);
        }

        [HttpPost]
        public async Task<ActionResult> RemoveCategory(int id)
        {
            var category = context.Categories.FirstOrDefault(x => x.Id.Equals(id));

            context.Categories.Remove(category);

            var res = await context.SaveChangesAsync();

            return RedirectToAction(nameof(ListCategories));
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
                user.Role = roleManager.FindById(user.RoleId).Name;
            }

            return usersModels;
        }
    }
}