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
using UmbracoChallenge.Models;

namespace IdentityPortal.Controllers
{
    public class DocumentController : UmbracoApiController
    {
        private readonly IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpPost]
        public HttpResponseMessage Upload()
        {
            //if (TokenUtils.TokenIsExpired())
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest);
            //}
            var httpRequest = HttpContext.Current.Request;

            if (httpRequest.Files.Count <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                var userId = TokenUtils.FetchUserIdFromRequest();

                foreach (string fileType in httpRequest.Files.Keys)
                {
                    var file = httpRequest.Files[fileType];

                    if (file != null && (file.ContentType.ToLowerInvariant().Contains("pdf") ||
                                         file.ContentType.ToLowerInvariant().Contains("jpeg") ||
                                         file.ContentType.ToLowerInvariant().Contains("jpg") ||
                                         file.ContentType.ToLowerInvariant().Contains("png")))
                    {
                        var filePath = HttpContext.Current.Server.MapPath("~/UploadedFiles/" + file.FileName);
                        file.SaveAs(filePath);
                        _documentService.DocumentUpload(new Document
                        {
                            DocumentType = Convert.ToInt32(fileType),
                            FileName = file.FileName,
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

        [HttpGet]
        public IHttpActionResult Documents()
        {
            try
            {
                var userId = TokenUtils.FetchUserIdFromRequest();
                var documents = _documentService.GetAllDocuments(userId);
                return Ok(documents);
            }
            catch (Exception ex)
            {
                throw new Exception("Fetch document failed: " + ex.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult Documents(int id)
        {
            try
            {
                var userId = TokenUtils.FetchUserIdFromRequest();
                _documentService.RemoveDocument(id);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Remove document failed: " + ex.Message);
            }
        }
    }
}