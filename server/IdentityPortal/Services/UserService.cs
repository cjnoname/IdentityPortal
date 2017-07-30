using System.Threading.Tasks;
using IdentityPortal.Context;
using IdentityPortal.Interfaces;

namespace IdentityPortal.Services
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