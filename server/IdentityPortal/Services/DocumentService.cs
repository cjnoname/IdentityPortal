using IdentityPortal.Context;
using IdentityPortal.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;

namespace IdentityPortal.Services
{
    public class DocumentService : IDocumentService
    {
        public void DocumentUpload(Document document)
        {
            using (var context = new KartelContext())
            {
                context.Documents.Add(document);
                context.SaveChanges();
            }
        }

        public List<Document> GetAllDocuments(int userId)
        {
            using (var context = new KartelContext())
            {
                return context.Documents.Where(x => x.UserId == userId).ToList();
            }
        }

        public void RemoveDocument(int id)
        {
            using (var context = new KartelContext())
            {
                context.Documents.Remove(context.Documents.Find(id));
                context.SaveChanges();
            }
        }
    }
}