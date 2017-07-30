using System;
using System.Configuration;
using System.Linq;
using IdentityPortal.Context;
using System.Web;

namespace IdentityPortal.Utils
{
    public static class TokenUtils
    {
        public static string GenerateTokenWithTimeStamp(int userId)
        {
            byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
            byte[] key = Guid.NewGuid().ToByteArray();
            byte[] userIdBytes = BitConverter.GetBytes(userId);
            return Convert.ToBase64String(time.Concat(key).Concat(userIdBytes).ToArray());
        }

        public static DateTime FetchDateTimeFromToken(string token)
        {
            byte[] data = Convert.FromBase64String(token);
            return DateTime.FromBinary(BitConverter.ToInt64(data, 0));
        }

        public static int FetchUserIdFromToken(string token)
        {
            byte[] data = Convert.FromBase64String(token);
            return BitConverter.ToInt32(data, 24);
        }

        public static bool ValidateToken(string token)
        {
            using (var context = new KartelContext())
            {
                var authToken = context.AuthTokens.SingleOrDefault(x => x.Token == token);
                if (authToken == null)
                {
                    return false;
                }
                var tokenValidHours = Convert.ToInt32(ConfigurationManager.AppSettings["TokenValidHours"]);
                var tokenDateTime = FetchDateTimeFromToken(token);
                if (tokenDateTime.AddHours(tokenValidHours) <= DateTime.Now)
                {
                    return false;
                }
                return true;
            }
        }

        public static bool TokenIsExpired()
        {
            var request = HttpContext.Current.Request;
            using (var context = new KartelContext())
            {
                var token = request.Headers["AuthToken"];

                if (token == null || !ValidateToken(token.ToString()))
                {
                    return true;
                }

                var userId = FetchUserIdFromToken(token);

                var user = context.Users.FirstOrDefault(x => x.Id == userId);
                if (user == null)
                {
                    return true;
                }
            }
            return false;
        }

    }
}