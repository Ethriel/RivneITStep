using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Genres;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class GenresController : Controller
    {
        private readonly IGenreService genreService;
        private readonly IMapper mapper;

        public GenresController(IGenreService genreService, IMapper mapper)
        {
            this.genreService = genreService;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            var genres = genreService.GetAllGenres();

            var models = mapper.Map<IEnumerable<Genre>, IEnumerable<GenreViewModel>>(genres);

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
            var genre = mapper.Map<CreateGenreViewModel, Genre>(model);

            genreService.CreateGenre(genre);

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var genre = genreService.GetGenreById(id);

            var model = mapper.Map<Genre, EditGenreViewModel>(genre);

            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(EditGenreViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Edit(model.Id);
            }

            var genre = mapper.Map<EditGenreViewModel, Genre>(model);

            genreService.UpdateGenre(genre);

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