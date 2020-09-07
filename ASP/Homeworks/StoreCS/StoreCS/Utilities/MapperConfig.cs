using AutoMapper;
using Microsoft.AspNet.Identity.EntityFramework;
using StoreCS.Areas.Admin.Models;
using StoreCS.Areas.ManageAccount.Models;
using StoreCS.Areas.Manager.Models;
using StoreCS.Entity;
using StoreCS.Models;

namespace StoreCS.Utilities
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            SharedModelsConfig();
            AdminConfig();
            ManagerConfig();
            ManageAccountConfig();
        }

        private void SharedModelsConfig()
        {
            CreateMap<RegisterViewModel, UserAddInfo>()
                .ForMember(x => x.ApplicationUser, opt => opt.Ignore())
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<News, NewsViewModel>();

            CreateMap<NewsViewModel, News>();
        }

        private void AdminConfig()
        {
            CreateMap<Category, CategoryViewModel>();

            CreateMap<CategoryViewModel, Category>();

            CreateMap<Category, CreateCategoryViewModel>();

            CreateMap<CreateCategoryViewModel, Category>();

            CreateMap<IdentityRole, RoleViewModel>();

            CreateMap<RoleViewModel, IdentityRole>();

            CreateMap<IdentityRole, CreateRoleViewModel>();

            CreateMap<CreateRoleViewModel, IdentityRole>();
        }

        private void ManagerConfig()
        {
            CreateMap<News, CreateNewsViewModel>();

            CreateMap<CreateNewsViewModel, News>();
        }

        private void ManageAccountConfig()
        {
            CreateMap<UserAddInfo, UserAddInfoViewModel>();

            CreateMap<UserAddInfoViewModel, UserAddInfo>();
        }
    }
}