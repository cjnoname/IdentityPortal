using System;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using UmbracoChallenge.Context;
using UmbracoChallenge.Interfaces;
using UmbracoChallenge.Utils;

namespace UmbracoChallenge.Services
{
    public class AuthService : IAuthService
    {
        public bool ValidateToken(string token)
        {
            using (var context = new KartelContext())
            {
                var authToken = context.AuthTokens.SingleOrDefault(x => x.Token == token);
                if (authToken == null)
                {
                    return false;
                }
                var tokenValidHours = Convert.ToInt32(ConfigurationManager.AppSettings["TokenValidHours"]);
                var tokenDateTime = TokenUtils.FetchDateTimeFromToken(token);
                if (tokenDateTime.AddHours(tokenValidHours) <= DateTime.Now)
                {
                    return false;
                }
                return true;
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