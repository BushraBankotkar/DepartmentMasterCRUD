using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace DepartmentMasterCRUD.Entity
{
    public class EmployeeMaster
    {
        [Key]
        [Display(Name = "Employee Id")]
        public int EmployeeId { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string? emp_FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        [StringLength(50, ErrorMessage = "Name should be 1 to 50 char in lenght")]
        public string? emp_LastName { get; set; }

        [Required]
        [Display(Name = "Department")]
        public string? emp_Department { get; set; }

        [Required]
        [Display(Name = "Designation")]
        public string? emp_Designation { get; set; }
    }
}
