using IdentityPortal.Context;
using System.Threading.Tasks;

namespace IdentityPortal.Interfaces
{
    public interface IAuthService
    {
        Task<string> RefreshAuthToken(string username);

        User ValidateToken(string token);
    }
}
