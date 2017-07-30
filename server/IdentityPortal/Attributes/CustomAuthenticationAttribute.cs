using System;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace UmbracoChallenge.Attributes
{
    public class CustomAuthenticationAttribute : ActionFilterAttribute, IAuthenticationFilter
    {
        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();

            //var request = HttpContext.Current.Request;
            //using (var context = new KartelContext())
            //{
            //    var token = request.Headers["AuthToken"];
            //    if (token == null || !ValidateToken(token.ToString()))
            //    {
            //        return true;
            //    }
            //    var userId = FetchUserIdFromToken(token);
            //    var user = context.Users.FirstOrDefault(x => x.Id == userId);
            //    if (user == null)
            //    {
            //        return true;
            //    }
            //}
            //return false;
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}