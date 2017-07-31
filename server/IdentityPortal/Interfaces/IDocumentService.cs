using IdentityPortal.Context;
using System.Collections.Generic;

namespace IdentityPortal.Interfaces
{
    public interface IDocumentService
    {
        void DocumentUpload(Document document);

        List<Document> GetAllDocuments(int userId);

        void RemoveDocument(int id);
    }
}
