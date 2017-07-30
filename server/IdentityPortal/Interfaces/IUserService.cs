using System.Threading.Tasks;
using UmbracoChallenge.Context;

namespace UmbracoChallenge.Interfaces
{
    public interface IUserService
    {
        Task Register(User user);
    }
}
