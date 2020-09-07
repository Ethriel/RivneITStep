using Autofac;
using Autofac.Integration.Mvc;
using AutoMapper;
using StoreCS.Models;
using System.Data.Entity;
using System.Web.Mvc;

namespace StoreCS.Utilities
{
    public static class AutofacConfiguration
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterType<ApplicationDbContext>().As<DbContext>().SingleInstance();

            var mapperConfig = new MapperConfiguration(x => x.AddProfile(new MapperConfig()));

            builder.RegisterInstance<IMapper>(mapperConfig.CreateMapper());

            DependencyResolver.SetResolver(new AutofacDependencyResolver(builder.Build()));
        }
    }
}