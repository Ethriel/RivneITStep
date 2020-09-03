using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StoreCS.Areas.Manager.Controllers
{
    public class ManagerPanelController : Controller
    {
        // GET: Manager/ManagerPanel
        public ActionResult Index()
        {
            return View();
        }
    }
}