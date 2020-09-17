using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Developers;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DevelopersController : Controller
    {
        private readonly IDeveloperService developerService;
        private readonly IMapper mapper;

        public DevelopersController(IDeveloperService developerService, IMapper mapper)
        {
            this.developerService = developerService;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            var developers = developerService.GetAllDevelopers();

            var models = mapper.Map<IEnumerable<Developer>, IEnumerable<DeveloperViewModel>>(developers);

            return View(models);
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateDeveloperViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Create();
            }
            var developer = mapper.Map<CreateDeveloperViewModel, Developer>(model);

            developerService.CreateDeveloper(developer);

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var developer = developerService.GetDeveloperById(id);

            var model = mapper.Map<Developer, EditDeveloperViewModel>(developer);

            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(EditDeveloperViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Edit(model.Id);
            }

            var developer = mapper.Map<EditDeveloperViewModel, Developer>(model);

            developerService.UpdateDeveloper(developer);

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            developerService.DeleteDeveloper(id);

            return RedirectToAction(nameof(Index));
        }
    }
}