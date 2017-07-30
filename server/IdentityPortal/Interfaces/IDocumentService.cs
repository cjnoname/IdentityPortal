using IdentityPortal.Context;
using System.Threading.Tasks;

namespace IdentityPortal.Interfaces
{
    public interface IDocumentService
    {
        Task DocumentUpload(Document document);
    }
}
