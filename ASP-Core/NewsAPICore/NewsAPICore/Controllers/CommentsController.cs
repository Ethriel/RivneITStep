using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewsAPICore.Extensions;
using NewsAPICore.Models;
using NewsDataAccessCore;
using NewsDataAccessCore.Entity;

namespace NewsAPICore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly ApplicationDbContext context;

        public CommentsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost("add/{newsId}")]
        public async Task<IActionResult> AddComment([FromRoute] int newsId, [FromBody] CreateCommentViewModel model)
        {
            var result = default(ApiResult);

            try
            {
                var news = await context.News.FindAsync(newsId);

                if (news == null)
                {
                    result = ApiResult.CreateResult(ApiStatus.NotFound, "News not found");
                }
                else
                {
                    var comment = new Comment
                    {
                        Message = model.Message,
                        Name = model.Name,
                        News = news
                    };

                    var resComment = await context.Comments.AddAsync(comment);

                    var save = await context.SaveChangesAsync();

                    result = ApiResult.CreateResult(ApiStatus.Ok, "Comment added");
                }

                return this.GetActionResult(result);
            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);

                return this.GetActionResult(result);
            }
        }

        [HttpGet("getNewsComments/{newsId}")]
        public async Task<IActionResult> GetNewsComments([FromRoute] int newsId)
        {
            var result = default(ApiResult);

            try
            {
                var news = await context.News.FindAsync(newsId);

                if (news == null)
                {
                    result = ApiResult.CreateResult(ApiStatus.NotFound, "News not found");
                }
                else
                {
                    var comments = context.Comments.Select(x => new CommentViewModel 
                    {
                        Id = x.Id,
                        Message = x.Message,
                        Name = x.Name
                    }).ToArray();

                    result = ApiResult.CreateResult(ApiStatus.Ok, data: comments);
                }

                return this.GetActionResult(result);
            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);

                return this.GetActionResult(result);
            }
        }
    }
}
