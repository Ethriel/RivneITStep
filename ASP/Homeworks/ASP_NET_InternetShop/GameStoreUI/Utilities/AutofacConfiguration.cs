using Autofac;
using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreBLL.Services.Implementation;
using GameStoreDAL;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using GameStoreDAL.Repository.Implementation;
using GameStoreUI.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Data.Entity;
using System.Web;

namespace GameStoreUI.Utilities
{
    public static class AutofacConfiguration
    {
        public static ContainerBuilder Configure()
        {
            var builder = new ContainerBuilder();

            builder = RegisterCustomTypes(builder);

            builder = RegisterAuthentication(builder);

            return builder;
        }

        private static ContainerBuilder RegisterCustomTypes(ContainerBuilder builder)
        {
            builder.RegisterType<ApplicationContext>().As<DbContext>().SingleInstance();
            builder.RegisterGeneric(typeof(EFRepository<>)).As(typeof(IGenericRepository<>));
            builder.RegisterType<GameService>().As<IGameService>();
            builder.RegisterType<DeveloperService>().As<IDeveloperService>();
            builder.RegisterType<GenreService>().As<IGenreService>();
            builder.RegisterType<CartService>().As<ICartService>();
            builder.RegisterType<OrderService>().As<IOrderService>();

            var mapperConfig = new MapperConfiguration(x => x.AddProfile(new MapperConfig()));

            builder.RegisterInstance<IMapper>(mapperConfig.CreateMapper());

            return builder;
        }

        private static ContainerBuilder RegisterAuthentication(ContainerBuilder builder)
        {
            builder.RegisterType<ApplicationUserStore>().As<IUserStore<GameStoreUser>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();

            builder.RegisterType<ApplicationRoleStore>().As<IRoleStore<GameStoreRole, string>>().InstancePerRequest();
            builder.RegisterType<ApplicationRoleManager>().AsSelf().InstancePerRequest();

            builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            builder.Register<IAuthenticationManager>(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();

            return builder;
        }
    }
}