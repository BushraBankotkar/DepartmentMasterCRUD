using DepartmentMasterCRUD.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DepartmentMasterCRUD.Pages.EmployeeMaster
{
    public class EditModel : PageModel
    {
        IEmployeeMasterRepository _employeeMasterRepository;
        public EditModel(IEmployeeMasterRepository employeeMasterRepository)
        {
            _employeeMasterRepository = employeeMasterRepository;
        }


        [BindProperty]
        public Entity.EmployeeMaster employee { get; set; }

        [TempData]
        public string ErrMessage1 { get; set; }

        public void OnGet(int id)
        {
            employee = _employeeMasterRepository.GetEmployee(id);
        }

        public IActionResult OnPost()
        {
            var data = employee;

            if (ModelState.IsValid)
            {
                // Check if an employee with the same first and last name already exists
                if (_employeeMasterRepository.EmployeeExists(employee.emp_FirstName, employee.emp_LastName, employee.EmployeeId))
                {
                    TempData["ErrMessage1"] = "An employee with the same first and last name already exists.";
                    return Page();
                }
                _employeeMasterRepository.EditEmployee(data);
                TempData["Message"] = "Employee details updated successfully!";
                return RedirectToPage("/EmployeeMaster/Index");
            }

            return Page();
        }
    }
}
