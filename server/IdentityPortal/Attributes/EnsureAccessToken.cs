using System;
using System.Linq;
using System.Web;
using UmbracoChallenge.Context;
using UmbracoChallenge.Utils;

namespace InfoTrack.Planly.Web.Attributes
{
    public class EnsureAccessToken : Attribute
    {
        public bool CheckToken()
        {
            var request = HttpContext.Current.Request;
            using (var context = new KartelContext())
            {
                var token = request.Headers["AccessToken"];

                if (token == null || !TokenUtils.ValidateToken(token.ToString()))
                {
                    return false;
                }

                var userId = TokenUtils.FetchUserIdFromToken(token);

                var user = context.Users.FirstOrDefault(x => x.Id == userId);
                if (user == null)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
