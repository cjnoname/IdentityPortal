namespace IdentityPortal.Models
{
    public class LoginResponse
    {
        public bool IsLoggedIn { get; set; }
        public string CurrenUserName { get; set; }
        public string AuthToken { get; set; }
    }
}