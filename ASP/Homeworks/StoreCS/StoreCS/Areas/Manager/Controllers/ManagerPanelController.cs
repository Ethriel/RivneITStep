using StoreCS.Areas.Manager.Models;
using StoreCS.Entity;
using StoreCS.Helpers;
using StoreCS.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
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
            var models = ModelHelper.GetNewsViewModels(context, Request, true);

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
            var category = context.Categories
                                  .FirstOrDefault(x => x.Name.Equals(model.Category));

            var news = new News
            {
                Category = category,
                Content = model.Content,
                Date = DateTime.Parse(model.Date),
                Header = model.Header
            };

            news.Image = ImageHelper.SaveImage(Server, imageFile, isNews: true);

            context.News.Add(news);

            context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<ActionResult> RemoveNews(int id)
        {
            var news = context.News.FirstOrDefault(x => x.Id.Equals(id));

            context.News.Remove(news);

            var res = await context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
    }
}