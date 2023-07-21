using DepartmentMasterCRUD.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DepartmentMasterCRUD.Pages.EmployeeMaster
{
    public class AddModel : PageModel
    {
        IEmployeeMasterRepository _employeeMasterRepository;
        public AddModel(IEmployeeMasterRepository employeeMasterRepository)
        {
            _employeeMasterRepository = employeeMasterRepository;
        }

        [BindProperty]
        public Entity.EmployeeMaster employee { get; set; }

        [TempData]
        public string ErrMessage { get; set; }
        public IActionResult OnGet()
        {
            return Page();
        }
        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                if (_employeeMasterRepository.EmployeeExists(employee.emp_FirstName, employee.emp_LastName, employee.EmployeeId))
                {
                    TempData["ErrMessage"] = "An employee with the same first and last name already exists.";
                    return RedirectToPage("/EmployeeMaster/Add");
                }
                _employeeMasterRepository.Add(employee);              
                TempData["Message"] = "Employee added successfully!";
                return RedirectToPage("/EmployeeMaster/Index");
            }

            return Page();
        }
    }
}
