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

namespace StoreCS.Areas.ManageAccount.Controllers
{
    [Authorize]
    public class ManageAccountPanelController : Controller
    {
        private ApplicationSignInManager signInManager;
        private ApplicationUserManager userManager;
        private ApplicationDbContext context;
        public ManageAccountPanelController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            context = new ApplicationDbContext();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        // GET: ManageAccount/ManageAccountPanel
        public ActionResult Index()
        {
            var model = GetCurrentUserModel();

            return View(model);
        }

        [HttpGet]
        public ActionResult ManageAccount()
        {
            var model = GetCurrentUserModel();

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
                var user = userManager.FindById(model.Id);

                var addInfo = user.UserAddInfo;

                var newAddInfo = new UserAddInfo
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Image = ImageHelper.SaveImage(450, 450, Server, imageFile)
                };
            }
            return RedirectToAction(nameof(Index));
        }

        private UserAddInfoViewModel GetCurrentUserModel()
        {
            var userId = User.Identity.GetUserId();

            var user = userManager.FindById(userId);

            var addInfo = user.UserAddInfo;

            var model = new UserAddInfoViewModel
            {
                Id = addInfo.Id,
                FirstName = addInfo.Id,
                LastName = addInfo.LastName
            };

            if (!string.IsNullOrWhiteSpace(addInfo.Image))
            {
                model.Image = string.Concat(Config.GetAbsoluteUri(Request), Config.UsersAvatarsPathOut, addInfo.Image);
            }

            return model;
        }
    }
}