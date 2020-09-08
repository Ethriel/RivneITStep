using Microsoft.AspNet.Identity;
using StoreCS.Areas.ManageAccount.Models;
using StoreCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StoreCS.Helpers;
using System.Drawing;
using System.Drawing.Imaging;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace StoreCS.Areas.ManageAccount.Controllers
{
    [Authorize]
    public class ManageAccountPanelController : Controller
    {
        private ApplicationSignInManager signInManager;
        private ApplicationUserManager userManager;
        private ApplicationDbContext context;
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                userManager = value;
            }
        }
        public ManageAccountPanelController()
        {
            context = new ApplicationDbContext();
        }
        public ManageAccountPanelController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            context = new ApplicationDbContext();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        // GET: ManageAccount/ManageAccountPanel
        public ActionResult Index()
        {
            var model = ModelHelper.GetUserAddInfoViewModel(User, UserManager, Request);

            return View(model);
        }

        [HttpGet]
        public ActionResult ManageAccount()
        {
            var model = ModelHelper.GetUserAddInfoViewModel(User, UserManager, Request);

            return View(model);
        }

        [HttpPost]
        public ActionResult ManageAccount(UserAddInfoViewModel model, HttpPostedFileBase imageFile)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            else
            {
                var userId = User.Identity.GetUserId();

                var user = UserManager.FindById(userId);

                var addInfo = user.UserAddInfo;

                var addInfoDb = context.UserAddInfos.FirstOrDefault(x => x.Id.Equals(addInfo.Id));

                model.Image = ImageHelper.SaveImage(Server, imageFile);

                context.Entry(addInfoDb).CurrentValues.SetValues(model);

                context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var userId = User.Identity.GetUserId();

            var result = await UserManager.ChangePasswordAsync(userId, model.OldPassword, model.NewPassword);

            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(userId);
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return RedirectToAction(nameof(Index));
            }

            AddErrors(result);

            return View(model);
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
    }
}