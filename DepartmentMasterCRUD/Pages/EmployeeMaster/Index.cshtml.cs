using DepartmentMasterCRUD.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DepartmentMasterCRUD.Pages.EmployeeMaster
{
    public class IndexModel : PageModel
    {
        IEmployeeMasterRepository _employeeMasterRepository;
        public IndexModel(IEmployeeMasterRepository employeeMasterRepository)
        {
            _employeeMasterRepository = employeeMasterRepository;
        }

        [BindProperty]
        public List<Entity.EmployeeMaster> employeeList { get; set; }

        [BindProperty]
        public Entity.EmployeeMaster employee { get; set; }

        //[TempData]
        //public string Message { get; set; }
        public void OnGet()
        {
            employeeList = _employeeMasterRepository.GetList();
        }

        public IActionResult OnGetDelete(int id)
        {
            if (id > 0)
            {
                 _employeeMasterRepository.DeleteEmployee(id);
                //if (count > 0)
                //{
                TempData["Message"] = "Employee details deleted successfully!";
                return RedirectToPage("/EmployeeMaster/Index");
                //}
            }

            return Page();

        }

        public IActionResult OnGetEmployee()
        {
            employeeList = _employeeMasterRepository.GetList();
            return new JsonResult(employeeList);
        }
    }
}