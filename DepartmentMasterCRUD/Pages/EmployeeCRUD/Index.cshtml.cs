using DepartmentMasterCRUD.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;


namespace DepartmentMasterCRUD.Pages.EmployeeCRUD
{
    public class IndexModel : PageModel
    {
        IEmployeeMasterRepository _employeeMasterRepository;
        public IndexModel(IEmployeeMasterRepository employeeMasterRepository)
        {
            _employeeMasterRepository = employeeMasterRepository;
        }

        [BindProperty]
        public Entity.EmployeeMaster employee { get; set; }

        [BindProperty]
        public List<Entity.EmployeeMaster> employeeList { get; set; }

        public IActionResult OnGet()
        {
            employeeList = _employeeMasterRepository.GetList();
            return Page();
        }

        public IActionResult OnGetEmployeeList()
        {
            List<Entity.EmployeeMaster> employeeList = _employeeMasterRepository.GetList();
            return new JsonResult(employeeList); // Return employeeList as JSON
        }

        public IActionResult OnPostGetAjax()
        {
            string message = "";
            int messageId = 0;
            if (ModelState.IsValid)
            {
                if (_employeeMasterRepository.EmployeeExists(employee.emp_FirstName, employee.emp_LastName, employee.EmployeeId))
                {
                    message = "Employee already exists!";
                    messageId = 1;
                }
                else
                {
                    _employeeMasterRepository.Add(employee);
                    message = "Employee added successfully!";
                    messageId = 2;
                }
                
            }
            
            //employeeList = _employeeMasterRepository.GetList();
            
            return new JsonResult(new { message = message, messageId = messageId});
        }

        public IActionResult OnGetDelete(int id)
        {
            if (id > 0)
            {
                _employeeMasterRepository.DeleteEmployee(id);
                //if (count > 0)
                //{
                TempData["Message"] = "Employee details deleted successfully!";
                return RedirectToPage("/EmployeeCRUD/Index");
                //}
            }

            return Page();

        }

        public IActionResult OnGetGetEmployee(int id)
        {
            var employee = _employeeMasterRepository.GetEmployee(id);
            if (employee == null)
            {
                return new JsonResult(null);
            }
            return new JsonResult(employee);
        }

        public IActionResult OnPostUpdateData()
        {
            var data = employee;
            string message = "";
            int messageId = 0;
            if (ModelState.IsValid)
            {
                //Check if an employee with the same first and last name already exists
                if (_employeeMasterRepository.EmployeeExists(employee.emp_FirstName, employee.emp_LastName, employee.EmployeeId))
                {
                    message = "Employee already exists!";
                    messageId = 1;
                }
                else
                {
                    _employeeMasterRepository.EditEmployee(data);
                    message = "Employee updated successfully!";
                    messageId = 2;
                }
                
            }
            else
            {
                message = "Error";
            }
            //employeeList = _employeeMasterRepository.GetList();

            return new JsonResult(new { message = message, messageId = messageId });
            
        }

    }
}
