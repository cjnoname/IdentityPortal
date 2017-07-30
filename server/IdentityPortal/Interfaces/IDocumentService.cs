using System.Threading.Tasks;

namespace IdentityPortal.Interfaces
{
    public interface IDocumentService
    {
        Task DocumentUpload(int userId);
    }
}
