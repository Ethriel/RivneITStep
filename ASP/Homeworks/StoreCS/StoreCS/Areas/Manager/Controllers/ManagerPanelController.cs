using StoreCS.Areas.Manager.Models;
using StoreCS.Entity;
using StoreCS.Helpers;
using StoreCS.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StoreCS.Areas.Manager.Controllers
{
    [Authorize(Roles = "Manager")]
    public class ManagerPanelController : Controller
    {
        private readonly ApplicationDbContext context;
        public ManagerPanelController()
        {
            context = new ApplicationDbContext();
        }
        public ActionResult Index()
        {
            var news = context.News.ToArray();

            var models = news.Select(x => new NewsViewModel
            {
                Category = x.Category.Name,
                Content = x.Content,
                Date = x.Date.ToShortDateString(),
                Header = x.Header,
                Id = x.Id,
                Image = string.Concat(Config.GetAbsoluteUri(Request), Config.NewsImagePathOut, x.Image)
            });

            return View(models);
        }

        [HttpGet]
        public ActionResult CreateNews()
        {
            var categories = context.Categories
                                    .Select(x => x.Name)
                                    .ToArray();

            ViewBag.Categories = categories;

            return View();
        }

        [HttpPost]
        public ActionResult CreateNews(CreateNewsViewModel model, HttpPostedFileBase imageFile)
        {
            var category = context.Categories.FirstOrDefault(x => x.Name.Equals(model.Category));

            var news = new News
            {
                Category = category,
                Content = model.Content,
                Date = DateTime.Parse(model.Date),
                Header = model.Header
            };

            SaveImage(ref news, imageFile);

            context.News.Add(news);

            context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        private void SaveImage(ref News news, HttpPostedFileBase imageFile)
        {
            if (imageFile == null)
            {
                return;
            }
            else
            {
                var fileName = string.Concat(Guid.NewGuid().ToString(), ".jpg");

                var fullPathImage = string.Concat(Server.MapPath(Config.NewsImagePath), "\\", fileName);

                using (var bmp = new Bitmap(imageFile.InputStream))
                {
                    var readyImage = ImageHelper.CreateImage(bmp, 450, 450);

                    if (readyImage != null)
                    {
                        readyImage.Save(fullPathImage, ImageFormat.Jpeg);

                        news.Image = fileName;
                    }
                }
            }
        }
    }
}