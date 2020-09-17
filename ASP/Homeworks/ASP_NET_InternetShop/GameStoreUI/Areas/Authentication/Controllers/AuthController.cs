using GameStoreUI.Areas.Authentication.Models;
using GameStoreUI.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity.Owin;
using GameStoreDAL.Entities;

namespace GameStoreUI.Areas.Authentication.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApplicationUserManager userManager;
        private readonly ApplicationSignInManager signInManager;
        private readonly ApplicationRoleManager roleManager;
        private readonly DbContext context;

        public AuthController(ApplicationUserManager userManager, ApplicationSignInManager signInManager, ApplicationRoleManager roleManager, DbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.context = context;
        }
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);

            switch (result)
            {
                case SignInStatus.Success:
                    var user = userManager.FindByName(model.UserName);
                    var roleId = context.Set<IdentityUserRole>().FirstOrDefault(x => x.UserId.Equals(user.Id)).RoleId;
                    var role = roleManager.FindById(roleId).Name;

                    switch (role)
                    {
                        case "Admin":
                        case "Customer":
                            return ReturnToGamesList();
                        default:
                            return View(model);
                    }
                case SignInStatus.LockedOut:
                case SignInStatus.RequiresVerification:
                case SignInStatus.Failure:
                default:
                    return View(model);
            }
        }
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = new GameStoreUser { Email = model.Email, UserName = model.UserName };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return View(model);
            }

            await signInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            userManager.AddToRole(user.Id, "Customer");
            return ReturnToGamesList();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOut()
        {
            signInManager.AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return ReturnToHome();
        }

        private ActionResult ReturnToHome()
        {
            return RedirectToAction("Index", "Home", new { area = "" });
        }
        private ActionResult ReturnToGamesList()
        {
            return RedirectToAction("ListGames", "Home", new { area = "" });
        }
    }
}