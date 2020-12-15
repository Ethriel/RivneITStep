using DoctorHouse.DLL;
using DoctorHouse.DLL.Entity;
using DoctorHouse.IdentityServer.Helper;
using IdentityServerHost.Quickstart.UI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DoctorHouse.IdentityServer
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var PersistantGrantString = Configuration.GetConnectionString("PersistantGrantConnection");
            var ConfigurationDbString = Configuration.GetConnectionString("ConfigurationDbConnection");

            var migrationsAssembly = typeof(EFContext).GetTypeInfo().Assembly.GetName().Name;

            services.AddControllersWithViews();

            services.AddDbContext<EFContext>(options =>
                                                options.UseNpgsql(connectionString));

            services.AddIdentity<DbUser, DbRole>(options => options.Stores.MaxLengthForKeys = 128)
                    .AddEntityFrameworkStores<EFContext>()
                    .AddDefaultTokenProviders();

            //services.Configure<SecurityStampValidatorOptions>(options =>
            //{
            //    options.ValidationInterval = TimeSpan.Zero;
            //});

            // configure identity server with in-memory stores, keys, clients and resources
            var builder = services.AddIdentityServer()
                                  .AddConfigurationStore(options =>
                                  {
                                       options.ConfigureDbContext = b => b.UseSqlServer(PersistantGrantString,
                                       sql => sql.MigrationsAssembly(migrationsAssembly));
                                  })
                                  .AddOperationalStore(options =>
                                  {
                                       options.ConfigureDbContext = b => b.UseSqlServer(ConfigurationDbString,
                                       sql => sql.MigrationsAssembly(migrationsAssembly));
                                  })
                                  //.AddInMemoryIdentityResources(Config.IdentityResources)
                                  //.AddInMemoryApiScopes(Config.ApiScopes)
                                  //.AddInMemoryClients(Config.Clients)
                                  //.AddInMemoryApiResources(Config.ApiResources)
                                  //.AddInMemoryClients(ConfigGlobal.Clients)
                                  //.AddTestUsers(TestUsers.Users);
                                  .AddAspNetIdentity<DbUser>()
                                  .AddProfileService<ProfileService>();

            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseIdentityServer();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });

            //InitializeIdentityContexts.Init(app.ApplicationServices);
        }
    }
}
