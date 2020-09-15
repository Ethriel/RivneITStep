using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NewsDataAccessCore;

namespace NewsAPICore
{
    public class Startup
    {
        //private readonly string contentRoot;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors(opt =>
            //{
            //    opt.AddPolicy("CorsPolicy", builder => builder.WithOrigins("https://localhost:44372"));
            //});

            //services.AddCors(opt =>
            //    opt.AddPolicy("CorsPolicy",
            //    builder =>
            //    builder.AllowAnyHeader()
            //           .AllowAnyMethod()
            //           .WithOrigins("https://localhost:44372", "http://127.0.0.1:5500")
            //           .AllowCredentials()));

            services.AddCors();

            var connection = Configuration.GetConnectionString("ConnectionString");

            services.AddDbContext<ApplicationDbContext>(options =>
                                                      options.UseSqlServer(connection));

            services.AddControllers()
                    .AddNewtonsoftJson(options => options.SerializerSettings
                                                         .ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseCors("CorsPolicy");

            app.UseCors(policy => policy.AllowAnyOrigin()
                                        .AllowAnyHeader()
                                        .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
