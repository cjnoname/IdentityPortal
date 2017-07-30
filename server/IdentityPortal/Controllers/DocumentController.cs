using InfoTrack.Planly.Web.Attributes;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Umbraco.Web.WebApi;
using UmbracoChallenge.Interfaces;
using UmbracoChallenge.Services;

namespace UmbracoChallenge.Controllers
{
    public class DocumentController : UmbracoApiController
    {
        private readonly IDocumentService _documentService = new DocumentService();

        [HttpPost]
        [EnsureAccessToken]
        public HttpResponseMessage SaveFile()
        {
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

            return Request.CreateResponse(HttpStatusCode.Created, "File Uploaded!");
        }
    }
}