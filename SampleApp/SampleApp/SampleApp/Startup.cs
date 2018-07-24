//using BizSightNext.Email;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
//using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.PlatformAbstractions;
//using Swashbuckle.AspNetCore.Swagger;
//using Swashbuckle.AspNetCore.Swagger;
//using Swashbuckle.AspNetCore.Swagger;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http.Features;

namespace SampleApp
{
    public class Startup
    {
        public static string _applicationPath = string.Empty;
        public Startup(IHostingEnvironment env)
        {
            _applicationPath = env.ContentRootPath;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                //.AddJsonFile("Configuration.json", optional: false, reloadOnChange: true)
                //.AddJsonFile($"Configuration.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            builder.AddJsonFile("appsettings.json");
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var pathToDoc = Configuration["Swagger:FileName"];
            //services.AddDbContext<MyIdentityDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //services.AddSingleton(Configuration);
            //services.AddIdentity<MyIdentityUser, MyIdentityRole>()
            //    .AddEntityFrameworkStores<MyIdentityDbContext>()
            //    .AddDefaultTokenProviders();
            //var appSettings = Configuration.GetSection("ConnectionStrings");
            //services.Configure<DefaultSettings>(appSettings);
            services.AddMvc();
            //services.Configure<FormOptions>(x =>
            //{
            //    x.ValueLengthLimit = int.MaxValue;
            //    x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            //});
            // services.AddSwaggerGen(c =>{c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            ////services.AddSwaggerGen(c =>
            ////{
            ////    c.SwaggerDoc("v1", new Info { Title = "BizSight API", Version = "v1" });
            ////});


            ////services.ConfigureSwaggerGen(options =>
            ////{

            ////    //options.SwaggerDoc("v1",
            ////    //    new Info
            ////    //    {
            ////    //        Title = "Geo Search API",
            ////    //        Version = "v1",
            ////    //        Description = "A simple api to search using geo location in Elasticsearch",
            ////    //        TermsOfService = "None"
            ////    //    }
            ////    // );

            ////    //var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, pathToDoc);
            ////    // options.IncludeXmlComments(filePath);
            ////    options.DescribeAllEnumsAsStrings();
            ////});
            //services.AddScoped<IBizRepository, BizRepository>();
            //For Email
            // services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

            // Add our repository type
            // services.AddSingleton<ITodoRepository, TodoRepository>();

            // Register the Swagger generator, defining one or more Swagger documents
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseFileServer();

            //// this will serve up node_modules
            var provider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                Path.Combine(_applicationPath, "node_modules")
            );
            var _fileServerOptions = new FileServerOptions();
            _fileServerOptions.RequestPath = "/node_modules";
            _fileServerOptions.StaticFileOptions.FileProvider = provider;
            _fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(_fileServerOptions);

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseStaticFiles();
            //app.UseIdentity();
            app.UseDefaultFiles();
            app.UseMvc(routes =>
            {
            });
            ////app.UseSwagger(c =>
            ////{
            ////    c.PreSerializeFilters.Add((swagger, httpReq) => swagger.Host = httpReq.Host.Value);

            ////});

            ////app.UseSwaggerUI(c =>
            ////{
            ////    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BizApi Docs");
            ////});

            //// Enable middleware to serve generated Swagger as a JSON endpoint.
            //app.UseSwagger();

            //// Enable middleware to serve swagger-ui (HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            //});
        }
    }
}