using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Genres;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    public class GenresController : Controller
    {
        private readonly IGenreService genreService;
        private readonly IMapper mapper;

        public GenresController(IGenreService genreService, IMapper mapper)
        {
            this.genreService = genreService;
            this.mapper = mapper;
        }
        public ActionResult Index()
        {
            var developers = genreService.GetAllGenres();

            var models = mapper.Map<IEnumerable<Genre>, IEnumerable<GenreViewModel>>(developers);

            return View(models);
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateGenreViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Create();
            }
            var developer = mapper.Map<CreateGenreViewModel, Genre>(model);

            genreService.CreateGenre(developer);

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var developer = genreService.GetGenreById(id);

            var model = mapper.Map<Genre, EditGenreViewModel>(developer);

            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(EditGenreViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Edit(model.Id);
            }

            var developer = mapper.Map<EditGenreViewModel, Genre>(model);

            genreService.UpdateGenre(developer);

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            genreService.DeleteGenre(id);

            return RedirectToAction(nameof(Index));
        }
    }
}