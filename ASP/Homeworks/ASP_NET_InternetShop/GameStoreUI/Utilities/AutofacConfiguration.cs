using Autofac;
using Autofac.Integration.Mvc;
using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreBLL.Services.Implementation;
using GameStoreDAL;
using GameStoreDAL.Repository.Abstraction;
using GameStoreDAL.Repository.Implementation;
using System.Data.Entity;
using System.Web.Mvc;

namespace GameStoreUI.Utilities
{
    public static class AutofacConfiguration
    {
        public static void ConfigureAutofac()
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

            DependencyResolver.SetResolver(new AutofacDependencyResolver(builder.Build()));
        }
    }
}