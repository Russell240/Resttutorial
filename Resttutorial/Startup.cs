using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.models;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.IO;

namespace TodoApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ToDoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
            services.AddControllers();
            // configues an instance of the swagger object 
            services.AddSwaggerGen(c =>
               c.SwaggerDoc("v1", new OpenApiInfo
               {
                   Version = "v1",
                   Title = "To Do APi",
                   Description = "A simple example ASP.NET Core Web API",
                   TermsOfService = new Uri("https://example.com.terms "),
                   Contact = new OpenApiContact
                   {
                       Name = "Shane Boyer",
                       Email = string.Empty,
                       Url = new Uri("https://twitter.com/sboyer"),
                   },
                   License = new OpenApiLicense
                   {
                       Name = "Use under LICX",
                       Url = new Uri("https://example.com/license"),
                   }
               }));
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            // enables middleware to serve generated Swagger as a JSON endpoint.

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.

            app.UseSwagger();

            app.UseSwaggerUI(c =>
                 {
                     c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                 });
        }

    }
}


