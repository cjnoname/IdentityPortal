using System.Threading.Tasks;
using IdentityPortal.Context;

namespace IdentityPortal.Interfaces
{
    public interface IUserService
    {
        Task Register(User user);
    }
}
