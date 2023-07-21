using DepartmentMasterCRUD.Entity;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;

namespace DepartmentMasterCRUD.Repository
{
    public class EmployeeMasterRepository: IEmployeeMasterRepository
    {
        IConfiguration _configuration;

        public EmployeeMasterRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Add(EmployeeMaster employee)
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var parameters = new
                {
                    Emp_FirstName = employee.emp_FirstName,
                    Emp_LastName = employee.emp_LastName,
                    Emp_Department = employee.emp_Department,
                    Emp_Designation = employee.emp_Designation
                };
                connection.Execute("AddEmployee", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public void DeleteEmployee(int employeeId)
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var parameters = new { EmployeeId = employeeId };
                connection.Execute("DeleteEmployee", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public void EditEmployee(EmployeeMaster employee)
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var parameters = new
                {
                    EmployeeId = employee.EmployeeId,
                    Emp_FirstName = employee.emp_FirstName,
                    Emp_LastName = employee.emp_LastName,
                    Emp_Department = employee.emp_Department,
                    Emp_Designation = employee.emp_Designation
                };
                connection.Execute("UpdateEmployee", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public List<EmployeeMaster> GetList()
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                return connection.Query<EmployeeMaster>("GetEmployees", commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public EmployeeMaster GetEmployee(int employeeId)
        {
            var connectionString = this.GetConnection();
            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var parameters = new { EmployeeId = employeeId };
                return connection.QuerySingleOrDefault<EmployeeMaster>("GetEmployeeById", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public bool EmployeeExists(string firstName, string lastName, int id)
        {
            var connectionString = this.GetConnection();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var parameters = new { Emp_FirstName = firstName, Emp_LastName = lastName, EmployeeId = id };
                var result = connection.QuerySingleOrDefault<int>(
                    "SELECT COUNT(*) FROM EmployeeMaster WHERE Emp_FirstName = @Emp_FirstName AND Emp_LastName = @Emp_LastName AND EmployeeId <> @EmployeeId",
                    parameters);

                return result > 0;
            }
        }

        public string GetConnection()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }
    }
}
