using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPICore.Extensions;
using NewsAPICore.Models;
using NewsDataAccessCore;
using NewsDataAccessCore.Entity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NewsAPICore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : Controller
    {
        private readonly ApplicationDbContext context;

        public NewsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetNews()
        {
            var result = default(ApiResult);

            var news = await context.News.ToArrayAsync();

            var models = news.Select(x => GetNewsViewModel(x));

            result = ApiResult.CreateResult(ApiStatus.Ok, data: models);

            return this.GetActionResult(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNews([FromBody] CreateNewsViewModel model)
        {
            var result = default(ApiResult);

            var news = new News
            {
                Description = model.Description,
                ImagePath = model.ImagePath,
                PostDate = model.PostDate,
                Title = model.Title
            };

            try
            {
                await context.News.AddAsync(news);
                await context.SaveChangesAsync();

                result = ApiResult.CreateResult(ApiStatus.Ok, "News added");
            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);

                return this.GetActionResult(result);
            }

            return this.GetActionResult(result);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateNews([FromRoute] int id, [FromBody] EditNewsViewModel model)
        {
            var result = default(ApiResult);

            try
            {
                var news = await context.News.FindAsync(id);
                if (news == null)
                {
                    result = ApiResult.CreateResult(ApiStatus.NotFound, "News not found");
                }
                else
                {
                    context.Entry<News>(news).CurrentValues.SetValues(model);
                    var save = await context.SaveChangesAsync();

                    result = ApiResult.CreateResult(ApiStatus.Ok, "Edited successfully");
                }
            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);

                return this.GetActionResult(result);
            }

            return this.GetActionResult(result);
        }

        [HttpGet("remove/{id}")]
        public async Task<IActionResult> RemoveNews([FromRoute] int id)
        {
            var result = default(ApiResult);

            try
            {
                var news = await context.News.FindAsync(id);
                if (news == null)
                {
                    result = ApiResult.CreateResult(ApiStatus.NotFound, "News not found");
                }
                else
                {
                    context.News.Remove(news);
                    var save = await context.SaveChangesAsync();

                    result = ApiResult.CreateResult(ApiStatus.Ok, "Removed successfully");
                }

            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);
                return this.GetActionResult(result);
            }

            return this.GetActionResult(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var result = default(ApiResult);

            try
            {
                var news = await context.News.FindAsync(id);
                if (news == null)
                {
                    result = ApiResult.CreateResult(ApiStatus.NotFound, "News not found");
                }
                else
                {
                    var model = GetNewsViewModel(news);

                    result = ApiResult.CreateResult(ApiStatus.Ok, data: model);
                }
            }
            catch (Exception ex)
            {
                result = ApiResult.CreateResult(ApiStatus.ApplicationError, ex.Message);
                return this.GetActionResult(result);
            }

            return this.GetActionResult(result);
        }

        private NewsViewModel GetNewsViewModel(News news)
        {
            return new NewsViewModel
            {
                Description = news.Description,
                Id = news.Id,
                ImagePath = news.ImagePath,
                PostDate = news.PostDate,
                Title = news.Title
            };
        }
    }
}
