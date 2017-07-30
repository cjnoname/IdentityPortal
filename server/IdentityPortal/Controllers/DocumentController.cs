using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Umbraco.Web.WebApi;
using IdentityPortal.Interfaces;
using IdentityPortal.Services;
using IdentityPortal.Utils;
using IdentityPortal.Context;
using System;
using UmbracoChallenge.Attributes;

namespace IdentityPortal.Controllers
{
    public class DocumentController : UmbracoApiController
    {
        private readonly IDocumentService _documentService = new DocumentService();

        [HttpPost]
        [CustomAuthentication]
        public HttpResponseMessage SaveFile()
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

            var documentType = Convert.ToInt32(httpRequest.Params["documentType"]);

            try
            {
                var userId = TokenUtils.FetchUserIdFromRequest();
                foreach (string fileName in httpRequest.Files.Keys)
                {
                    var file = httpRequest.Files[fileName];

                    if (file != null && (file.ContentType.ToLowerInvariant().Contains("pdf") ||
                                         file.ContentType.ToLowerInvariant().Contains("jpeg") ||
                                         file.ContentType.ToLowerInvariant().Contains("png")))
                    {
                        var filePath = HttpContext.Current.Server.MapPath("~/UploadedFiles/" + file.FileName);
                        file.SaveAs(filePath);
                        _documentService.DocumentUpload(new Document
                        {
                            DocumentType = documentType,
                            FileName = fileName,
                            UserId = userId
                        });
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.NotAcceptable, "Unsupported file format");
                }
                return Request.CreateResponse(HttpStatusCode.Created, "File Uploaded!");
            }
            catch (Exception ex)
            {
                throw new Exception("Upload file failed: " + ex.Message);
            }
        }
    }
}