using System.Threading.Tasks;

namespace IdentityPortal.Interfaces
{
    interface IAuthService
    {
        Task<string> RefreshAuthToken(string username);

        bool ValidateToken(string token);
    }
}
