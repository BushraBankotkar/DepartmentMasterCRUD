using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace DepartmentMasterCRUD.Entity
{
    public class UserData
    {
        public int UserID { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [MaxLength(50)]
        public string UserRole { get; set; }
    }

    public class UserDetailForLogin
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string NormalPassword { get; set; }
    }
}
