using DepartmentMasterCRUD.Entity;

namespace DepartmentMasterCRUD.Repository
{
    public interface ILoginRepository
    {
        Task<UserData> GetUserByUsernameAsync(string username);
        bool VerifyPassword(string enteredPassword, string storedHashedPassword);
    }
}