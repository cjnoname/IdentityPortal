using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Umbraco.Web.WebApi;
using IdentityPortal.Interfaces;
using IdentityPortal.Services;
using IdentityPortal.Utils;
using IdentityPortal.Context;

namespace IdentityPortal.Controllers
{
    public class DocumentController : UmbracoApiController
    {
        private readonly IDocumentService _documentService = new DocumentService();

        [HttpPost]
        public HttpResponseMessage SaveFile(Document document)
        {
            if (TokenUtils.TokenIsExpired())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            var httpRequest = HttpContext.Current.Request;

            if (httpRequest.Files.Count <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            foreach (string fileName in httpRequest.Files.Keys)
            {
                var file = httpRequest.Files[fileName];

                if (file != null && (file.ContentType.ToLowerInvariant().Contains("pdf") ||
                                     file.ContentType.ToLowerInvariant().Contains("jpeg") ||
                                     file.ContentType.ToLowerInvariant().Contains("png")))
                {
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadedFiles/" + file.FileName);
                    file.SaveAs(filePath);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable, "Unsupported file format");
            }

            document.UserId = TokenUtils.FetchUserIdFromRequest();
            _documentService.DocumentUpload(document);

            return Request.CreateResponse(HttpStatusCode.Created, "File Uploaded!");
        }
    }
}