using System.Threading.Tasks;
using UmbracoChallenge.Context;
using UmbracoChallenge.Interfaces;

namespace UmbracoChallenge.Services
{
    public class UserService : IUserService
    {
        public async Task Register(User user)
        {
            using (var context = new KartelContext())
            {
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }
        }
    }
}