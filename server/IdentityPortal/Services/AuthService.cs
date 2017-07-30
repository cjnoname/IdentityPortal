using System;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using IdentityPortal.Context;
using IdentityPortal.Interfaces;
using IdentityPortal.Utils;

namespace IdentityPortal.Services
{
    public class AuthService : IAuthService
    {
        public User ValidateToken(string token)
        {
            using (var context = new KartelContext())
            {
                var authToken = context.AuthTokens.SingleOrDefault(x => x.Token == token);
                if (authToken == null)
                {
                    return null;
                }
                var tokenValidHours = Convert.ToInt32(ConfigurationManager.AppSettings["TokenValidHours"]);
                var tokenDateTime = TokenUtils.FetchDateTimeFromToken(token);
                if (tokenDateTime.AddHours(tokenValidHours) <= DateTime.Now)
                {
                    return null;
                }
                var userId = TokenUtils.FetchUserIdFromToken(token);
                return context.Users.Find(userId);
            }
        }

        public async Task<string> RefreshAuthToken(string username)
        {
            using (var context = new KartelContext())
            {
                var userId = context.Users.SingleOrDefault(x => x.Email == username).Id;
                var existingToken = context.AuthTokens.SingleOrDefault(x => x.UserId == userId);
                var newToken = TokenUtils.GenerateTokenWithTimeStamp(userId);
                if (existingToken != null)
                {
                    existingToken.Token = newToken;
                    await context.SaveChangesAsync();
                    return existingToken.Token;
                }
                context.AuthTokens.Add(new AuthToken
                {
                    Token = newToken,
                    UserId = userId
                });
                await context.SaveChangesAsync();
                return newToken;
            }
        }
    }
}