using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Umbraco.Web.WebApi;
using IdentityPortal.Models;
using LoginModel = IdentityPortal.Models.LoginModel;
using IdentityPortal.Interfaces;
using IdentityPortal.Services;
using IdentityPortal.Context;

namespace IdentityPortal.Controllers
{
    public class AuthController : UmbracoApiController
    {
        // should use DI (autofac) but umbraco does not support well, hack in for now...
        private readonly IUserService _userService = new UserService();
        private readonly IAuthService _authService = new AuthService();

        [HttpPost]
        public async Task<HttpResponseMessage> Login([FromBody]LoginModel model)
        {
            if (model == null || !ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, JsonConvert.SerializeObject(new LoginResponse() { IsLoggedIn = false, CurrenUserName = null }));
            try
            {
                // umbraco login system
                var result = Members.Login(model.Username, model.Password);

                if (!result)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new LoginResponse() { IsLoggedIn = false, CurrenUserName = null });

                var member = Members.GetByUsername(model.Username);

                // refresh the token during each login
                var token = await _authService.RefreshAuthToken(model.Username);
                return Request.CreateResponse(HttpStatusCode.OK, new LoginResponse() { IsLoggedIn = true, CurrenUserName = member?.Name, AuthToken = token });
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to login: " + ex.Message);
            }
        }

        /// <summary>
        /// Check if the email address is already registered
        /// </summary>
        /// <param name="email">user email</param>
        /// <returns>true if email address is already registered</returns>
        [HttpPost]
        public HttpResponseMessage CheckMemberExistanceByEmailOnRegister(string email)
        {
            if (string.IsNullOrEmpty(email))
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Email cannot be empty");

            try
            {
                // umbraco
                return Request.CreateResponse(HttpStatusCode.OK, Members.GetByEmail(email) != null);
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to check member existance: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<HttpResponseMessage> RegisterMember([FromBody]User user)
        {
            // validate model
            if (user == null || !ModelState.IsValid) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid user model");

            try
            {
                // check whether the user is existing
                var result = await CheckMemberExistanceByEmailOnRegister(user.Email).Content.ReadAsStringAsync();
                if (result.ToLowerInvariant() == "true") return Request.CreateResponse(HttpStatusCode.Conflict, "This Email address has been registered!");

                // use umbraco member
                var newMember =
                    ApplicationContext.Services.MemberService.CreateMember(user.Email, user.Email, user.Name,
                        "Member");
                ApplicationContext.Services.MemberService.Save(newMember);
                ApplicationContext.Services.MemberService.SavePassword(newMember, user.Password);

                // store user info in db
                await _userService.Register(user);
                var token = await _authService.RefreshAuthToken(user.Email);
                return Request.CreateResponse(HttpStatusCode.OK, new LoginResponse() { IsLoggedIn = true, CurrenUserName = user?.Name, AuthToken = token });
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to create new member: " + ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage ValidateToken([FromBody]string token)
        {
            try
            {
                var user = _authService.ValidateToken(token);
                if(user == null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Token validation failed");
                return Request.CreateResponse(HttpStatusCode.OK, new LoginResponse() { IsLoggedIn = true, CurrenUserName = user?.Name, AuthToken = token });
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}