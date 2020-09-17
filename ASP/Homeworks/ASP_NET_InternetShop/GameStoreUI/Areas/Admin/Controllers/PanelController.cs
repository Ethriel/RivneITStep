using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class PanelController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}