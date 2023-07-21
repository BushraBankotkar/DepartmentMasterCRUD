using DepartmentMasterCRUD.Entity;
using System.Collections.Generic;

namespace DepartmentMasterCRUD.Repository
{
    public interface IEmployeeMasterRepository
    {
        void Add(EmployeeMaster employee);

        List<EmployeeMaster> GetList();

        EmployeeMaster GetEmployee(int id);

        void EditEmployee(EmployeeMaster product);

        void DeleteEmployee(int id);

        public bool EmployeeExists(string firstName, string lastName, int id);
    }
}
