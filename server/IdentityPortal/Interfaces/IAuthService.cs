using IdentityPortal.Context;
using System.Threading.Tasks;

namespace IdentityPortal.Interfaces
{
    interface IAuthService
    {
        Task<string> RefreshAuthToken(string username);

        User ValidateToken(string token);
    }
}
