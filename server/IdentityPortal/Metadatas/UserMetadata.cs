using System;
using System.ComponentModel.DataAnnotations;

namespace IdentityPortal.Metadatas
{
    // for validate user table
    public class UserMetadata
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Passport { get; set; }
    }
}