using IdentityPortal.Context;
using IdentityPortal.Interfaces;
using System.Threading.Tasks;

namespace IdentityPortal.Services
{
    public class DocumentService : IDocumentService
    {
        public async Task DocumentUpload(Document document)
        {
            using(var context = new KartelContext())
            {
                context.Documents.Add(document);
                await context.SaveChangesAsync();
            }
        }
    }
}