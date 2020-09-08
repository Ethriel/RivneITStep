using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Areas.Admin.Models;
using StoreCS.Areas.ManageAccount.Models;
using StoreCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace StoreCS.Helpers
{
    public static class ModelHelper
    {
        public static AdminViewModel GetAdminViewModel(ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            var roles = GetRoleNames(context);

            var userViewModels = GetUserViewModels(context, roleManager);

            var adminViewModel = new AdminViewModel
            {
                Roles = roles,
                Users = userViewModels
            };

            return adminViewModel;
        }

        public static IEnumerable<RoleViewModel> GetRoleViewModels(ApplicationDbContext context)
        {
            var roles = context.Roles.ToArray();

            var models = roles.Select(x => new RoleViewModel
            {
                Id = x.Id,
                Name = x.Name
            });

            return models;
        }

        public static IEnumerable<CategoryViewModel> GetCategoryViewModels(ApplicationDbContext context)
        {
            var categories = context.Categories.ToArray();

            var models = categories.Select(x => new CategoryViewModel
            {
                Id = x.Id,
                Name = x.Name
            });

            return models;
        }

        public static IEnumerable<NewsViewModel> GetNewsViewModels(ApplicationDbContext context, HttpRequestBase request, bool isManager = false)
        {
            var news = context.News.ToArray();

            var models = news.Select(x => new NewsViewModel
            {
                Category = x.Category.Name,
                Content = x.Content,
                Date = x.Date.ToShortDateString(),
                Header = x.Header,
                Id = x.Id,
                Image = string.Concat(Config.GetAbsoluteUri(request), Config.NewsImagePathOut, x.Image),
                IsManager = isManager
            });

            return models;
        }

        public static UserAddInfoViewModel GetUserAddInfoViewModel(IPrincipal user, ApplicationUserManager userManager, HttpRequestBase request)
        {
            var userId = user.Identity.GetUserId();

            var currentUser = userManager.FindById(userId);

            var addInfo = currentUser.UserAddInfo;

            var model = new UserAddInfoViewModel
            {
                //Id = addInfo.Id,
                FirstName = addInfo.FirstName,
                LastName = addInfo.LastName
            };

            if (!string.IsNullOrWhiteSpace(addInfo.Image))
            {
                model.Image = string.Concat(Config.GetAbsoluteUri(request), Config.UsersAvatarsPathOut, addInfo.Image);
            }

            return model;
        }

        private static IEnumerable<string> GetRoleNames(ApplicationDbContext context)
        {
            var roles = context.Set<IdentityRole>()
                               .Select(x => x.Name)
                               .ToArray();

            return roles;
        }

        private static IEnumerable<UserViewModel> GetUserViewModels(ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            var usersModels = context.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Email = x.Email,
                RoleId = context.Set<IdentityUserRole>().FirstOrDefault(y => y.UserId.Equals(x.Id)).RoleId,
            }).Where(y => y.RoleId != null).ToArray();

            foreach (var user in usersModels)
            {
                user.Role = roleManager.FindById(user.RoleId).Name;
            }

            return usersModels;
        }
    }
}