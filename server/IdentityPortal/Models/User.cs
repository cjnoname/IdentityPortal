using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using IdentityPortal.Metadatas;

namespace IdentityPortal.Context
{
    [MetadataType(typeof(UserMetadata))]
    public partial class User
    {
        [Required]
        public string Password { get; set; }

        [JsonIgnore]
        public string Name
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        [JsonIgnore]
        public bool UsernameIsEmail
        {
            get
            {
                return true;
            }
        }
    }
}