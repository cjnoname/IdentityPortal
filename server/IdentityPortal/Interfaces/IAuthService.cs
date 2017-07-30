using System.Threading.Tasks;

namespace UmbracoChallenge.Interfaces
{
    interface IAuthService
    {
        Task<string> RefreshAuthToken(string username);

        bool ValidateToken(string token);
    }
}
