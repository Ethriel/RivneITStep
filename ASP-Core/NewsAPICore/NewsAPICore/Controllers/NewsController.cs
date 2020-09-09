﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPICore.Extensions;
using NewsAPICore.Models;
using NewsDataAccessCore;
using NewsDataAccessCore.Entity;

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

            var news = await context.News.Select(x => new NewsViewModel
            {
                Description = x.Description,
                Id = x.Id,
                ImagePath = x.ImagePath,
                PostDate = x.PostDate,
                Title = x.Title
            }).ToArrayAsync();

            result = ApiResult.CreateResult(ApiStatus.Ok, data: news);

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
    }
}
