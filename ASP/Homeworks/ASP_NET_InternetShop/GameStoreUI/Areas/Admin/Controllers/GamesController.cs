using AutoMapper;
using GameStoreBLL.Filters;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Games;
using GameStoreUI.Helpers;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    public class GamesController : Controller
    {
        private readonly IGameService gameService;
        private readonly IDeveloperService developerService;
        private readonly IGenreService genreService;
        private readonly IMapper mapper;
        private readonly DbContext context;

        public GamesController(IGameService gameService, IDeveloperService developerService, IGenreService genreService, IMapper mapper, DbContext context)
        {
            this.gameService = gameService;
            this.developerService = developerService;
            this.genreService = genreService;
            this.mapper = mapper;
            this.context = context;
        }

        public ActionResult Index()
        {
            var games = gameService.GetAllGames();

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            var model = new GamesModel
            {
                Games = models,
                IsAdmin = UserHelper.IsAdmin(User, context)
            };

            SetGenresDevelopers();

            return View(model);
        }

        [HttpGet]
        public ActionResult Search(string criteria)
        {
            var games = default(IEnumerable<Game>);

            var criteriaNull = string.IsNullOrWhiteSpace(criteria);

            if (criteriaNull)
            {
                games = gameService.GetAllGames();
            }
            else
            {
                games = gameService.FindGamesByCriteria(criteria);
            }

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            SetGenresDevelopers();

            return PartialView("Partial/GamesPartial", models);
        }

        [HttpGet]
        public ActionResult Filter(string type, string name)
        {
            var games = default(IEnumerable<Game>);
            var typeNull = string.IsNullOrWhiteSpace(type);
            var nameNull = string.IsNullOrWhiteSpace(name);

            if (!typeNull && !nameNull)
            {
                AddFilter(type, name);
                games = gameService.FilterGames(Session["GameFilters"] as List<GameFilter>);
            }
            else
            {
                games = gameService.GetAllGames();
            }

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            return PartialView("Partial/GamesPartial", models);
        }

        private void AddFilter(string type, string name)
        {
            var filters = Session["GameFilters"] as ICollection<GameFilter>;

            if (filters == null)
            {
                filters = new List<GameFilter>();
            }

            var present = filters.FirstOrDefault(x => x.Type.Equals(type) && x.Name.Equals(name));

            var filter = default(GameFilter);

            if (present == null)
            {
                filter = new GameFilter
                {
                    Type = type,
                    Name = name
                };

                if (type.Equals("Developer"))
                {
                    filter.Predicate = (x => x.Developer.Name.Equals(name));
                }
                else
                {
                    filter.Predicate = (x => x.Genre.Name.Equals(name));
                }
                filters.Add(filter);
            }
            else
            {
                filters.Remove(present);
            }

            Session["GameFilters"] = filters;
        }

        [HttpGet]
        public ActionResult Create()
        {
            SetGenresDevelopers();

            return View();
        }

        [HttpPost]
        public ActionResult CreateWithCustomImage(CreateGameViewModel model, HttpPostedFileBase imageFile)
        {
            var game = mapper.Map<CreateGameViewModel, Game>(model);

            game.Image = ImageHelper.SaveImage(Server, imageFile);

            gameService.CreateGame(game);

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            SetGenresDevelopers();

            var game = gameService.GetGameById(id);

            var model = mapper.Map<Game, EditGameViewModel>(game);

            return View(model);
        }

        [HttpPost]
        public ActionResult EditWithCustomImage(EditGameViewModel model, HttpPostedFileBase imageFile)
        {
            if (!ModelState.IsValid)
            {
                return Edit(model.Id);
            }

            var game = mapper.Map<EditGameViewModel, Game>(model);

            DeleteImage(game.Id);

            game.Image = ImageHelper.SaveImage(Server, imageFile);

            gameService.UpdateGame(game);

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            DeleteImage(id);

            gameService.DeleteGame(id);

            return RedirectToAction(nameof(Index));
        }

        private void SetGenresDevelopers()
        {
            ViewBag.Genres = genreService.GetGenresNames();
            ViewBag.Developers = developerService.GetDevelopersNames();
        }

        private void DeleteImage(int id)
        {
            var game = gameService.GetGameById(id);

            var imgName = game.Image;

            var imgFolder = Server.MapPath(Config.GamesImagesPath);

            var fullPath = Path.Combine(imgFolder, imgName);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
        }
    }
}