using Azure;
using DepartmentMasterCRUD.Entity;
using DepartmentMasterCRUD.Repository;
using DepartmentMasterCRUD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
//using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DepartmentMasterCRUD.Pages.Login
{
    [IgnoreAntiforgeryToken(Order = 1001)]
    public class LoginModel : PageModel
    {
        private readonly IConfiguration _configuration;
        ILoginRepository _loginRepository;
        //private readonly JsonSerializerSettings _serializerSettings;
        private readonly HttpClient _httpClient;
        public LoginModel(IConfiguration configuration, ILoginRepository loginRepository, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _loginRepository = loginRepository;
            //_serializerSettings = new JsonSerializerSettings
            //{
            //    Formatting = Formatting.Indented
            //};
            _httpClient = httpClientFactory.CreateClient("MyApiClient");

        }

        [BindProperty]
        public UserData LoginCredentials { get; set; }

        [AllowAnonymous]
        public IActionResult OnGet()
        {
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var endpoint = "api/Login";
            var username = LoginCredentials.UserName;
            var password = LoginCredentials.Password;
            var queryString = $"?username={username}&password={password}";
            var content = new StringContent("");
            var response = await _httpClient.PostAsync(endpoint+queryString, null);

            if (response.IsSuccessStatusCode)
            {
                // Handle the successful login response (e.g., redirect to another page)
                var responseContent = await response.Content.ReadAsStringAsync();
                string authToken = JObject.Parse(responseContent)["auth_token"].ToString();
                if (authToken != null)
                {
                    // Save token in session object
                    HttpContext.Session.SetString("JWToken", authToken);
                }
                return Redirect("/EmployeeCRUD/Index");
            }
            else
            {
                // Handle the error response (e.g., display error message on the page)
                return new JsonResult((new { response = "Error" }));
            }
        }



    }
}
