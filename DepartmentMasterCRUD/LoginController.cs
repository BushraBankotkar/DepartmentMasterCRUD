using DepartmentMasterCRUD.Entity;
using DepartmentMasterCRUD.Repository;
using DepartmentMasterCRUD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DepartmentMasterCRUD
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginRepository _loginRepository;
        private readonly JsonSerializerSettings _serializerSettings;

        public LoginController(IConfiguration configuration, ILoginRepository loginRepository)
        {
            _configuration = configuration;
            _loginRepository = loginRepository;
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        [HttpPost]
        public async Task<IActionResult> GetJsonToken(string username, string password)
        {
            // Find the user based on the provided username
            var user = await _loginRepository.GetUserByUsernameAsync(username);

            // If the user is not found or the password doesn't match, return an error response
            if (user == null || !_loginRepository.VerifyPassword(password, user.Password))
            {
                return new JsonResult(new { error = "Invalid username or password." });
            }

            var response = new
            {
                employeeDetails = user,
                auth_token = TokenUtility.GenerateJwtToken(_configuration, username, user.UserRole),
            };

            //if (response.auth_token != null)
            //{
            //    // Save token in session object
            //    HttpContext.Session.SetString("JWToken", response.auth_token);
            //}

            // Return the token as JSON response
            var json = JsonConvert.SerializeObject(response, _serializerSettings);
            return Content(json, "application/json");
        }
    }


}
