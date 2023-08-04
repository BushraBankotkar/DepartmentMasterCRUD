using Dapper;
using DepartmentMasterCRUD.Entity;
using Microsoft.Data.SqlClient;

namespace DepartmentMasterCRUD.Repository
{
    public class LoginRepository : ILoginRepository
    {
        IConfiguration _configuration;

        public LoginRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<UserData> GetUserByUsernameAsync(string username)
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                // Assuming the table name is "Users" and columns are "UserName" and "Password"
                return await connection.QuerySingleOrDefaultAsync<UserData>("SELECT * FROM UserData WHERE UserName = @Username", new { Username = username });
            }
        }

        public bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            // Implement your password verification logic here (e.g., using BCrypt or any other secure hashing algorithm).
            // For simplicity, we'll assume plain text comparison for this example.
            return enteredPassword == storedHashedPassword;
        }

        public string GetConnection()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }
    }
}