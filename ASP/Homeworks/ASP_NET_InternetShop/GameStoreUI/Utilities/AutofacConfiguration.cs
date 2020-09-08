using Autofac;
using Autofac.Integration.Mvc;
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
using Microsoft.Owin.Security.DataProtection;
using Owin;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;

namespace GameStoreUI.Utilities
{
    public static class AutofacConfiguration
    {
        public static void ConfigureAutofac(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterType<ApplicationContext>().As<DbContext>().SingleInstance();
            builder.RegisterGeneric(typeof(EFRepository<>)).As(typeof(IGenericRepository<>));
            builder.RegisterType<GameService>().As<IGameService>();
            builder.RegisterType<DeveloperService>().As<IDeveloperService>();
            builder.RegisterType<GenreService>().As<IGenreService>();

            var mapperConfig = new MapperConfiguration(x => x.AddProfile(new MapperConfig()));

            builder.RegisterInstance<IMapper>(mapperConfig.CreateMapper());
            builder.RegisterType<ApplicationContext>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationUserStore>().As<IUserStore<GameStoreUser>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            builder.Register<IAuthenticationManager>(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            builder.Register<IDataProtectionProvider>(c => app.GetDataProtectionProvider()).InstancePerRequest();

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            app.UseAutofacMiddleware(container);

            app.UseAutofacMvc();
        }
    }
}