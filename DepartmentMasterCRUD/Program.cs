using DepartmentMasterCRUD.Entity;
using DepartmentMasterCRUD.Repository;
using FluentAssertions.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Newtonsoft.Json;
using DepartmentMasterCRUD.Services;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add your services and other configurations...
builder.Services.AddMvc();
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages(options =>
{
    //options.Conventions.AuthorizePage("/EmployeeCRUD/Index");
    //options.Conventions.AuthorizePage("/EmployeeMaster/Index");
});
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(60);
});
builder.Services.AddHttpClient("MyApiClient", client =>
{
    client.BaseAddress = new Uri("https://localhost:44346/"); // Replace with your API base URL
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});
builder.Services.AddTransient<IEmployeeMasterRepository, EmployeeMasterRepository>();
builder.Services.AddTransient<ILoginRepository, LoginRepository>();
//builder.Services.AddTransient<ILoginService, LoginService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
    //o.Events = new JwtBearerEvents
    //{
    //    OnChallenge = context =>
    //    {
    //        if (!context.Response.HasStarted)
    //        {
    //            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
    //            context.HandleResponse();
    //            context.Response.Redirect("/Login/Login");
    //        }

    //        return Task.CompletedTask;
    //    }
    //};
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy();

//Addd User session - JRozario
app.UseSession();

//Add JWToken to all incoming HTTP Request Header - JRozario
app.Use(async (context, next) =>
{
    var JWToken = context.Session.GetString("JWToken");
    if (!string.IsNullOrEmpty(JWToken))
    {
        context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
    }
    await next();
});
app.UseStatusCodePages(async context =>
{
    if (context.HttpContext.Request.Path.Value.StartsWith("/EmployeeMaster/Index", StringComparison.OrdinalIgnoreCase) &&
       (context.HttpContext.Response.StatusCode == 401 ||
        context.HttpContext.Response.StatusCode == 403))
    {
        var result = JsonConvert.SerializeObject(new
        {
            error = new { message = "jwt_auth_token_missing_or_expired", status_code = context.HttpContext.Response.StatusCode }
        });
        await context.HttpContext.Response.WriteAsync(result);
    }
});

// Add the authentication middleware
app.UseAuthentication();

app.UseRouting();

//app.MapRazorPages();

//app.Use(async (context, next) =>
//{
//    var path = context.Request.Path;
//    var isAuthenticated = context.User.Identity.IsAuthenticated;
//    if (!isAuthenticated && path.HasValue && !path.Value.StartsWith("/Login"))
//    {
//        context.Response.Redirect("/Login/Login");
//        return;
//    }

//    await next();
//});
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
    endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller=Login}/{action=GetJsonToken}"


                );
});

app.Run();