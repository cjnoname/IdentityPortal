using IdentityPortal.Context;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace IdentityPortal.Metadatas
{
    // for validate document table
    public class DocumentMetadata
    {
        [Required]
        public int DocumentType { get; set; }
        [Required]
        public string FileName { get; set; }
        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}