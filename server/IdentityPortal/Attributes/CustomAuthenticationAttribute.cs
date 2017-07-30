using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace UmbracoChallenge.Attributes
{
    public class CustomAuthenticationAttribute : ActionFilterAttribute, IAuthenticationFilter
    {
        public Task AuthenticateAsync(HttpAuthenticationContext authContext, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}