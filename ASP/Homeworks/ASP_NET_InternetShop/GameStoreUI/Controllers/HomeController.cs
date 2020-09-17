using AutoMapper;
using GameStoreBLL.Filters;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Games;
using GameStoreUI.Helpers;
using GameStoreUI.Identity;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace GameStoreUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGameService gameService;
        private readonly IDeveloperService developerService;
        private readonly IGenreService genreService;
        private readonly IMapper mapper;
        private readonly DbContext context;

        public HomeController(IGameService gameService, IDeveloperService developerService, IGenreService genreService, IMapper mapper, DbContext context)
        {
            this.gameService = gameService;
            this.developerService = developerService;
            this.genreService = genreService;
            this.mapper = mapper;
            this.context = context;
        }
        public ActionResult Index()
        {
            var games = gameService.GamesForHome();

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            return View(models);
        }

        public ActionResult ListGames()
        {
            var games = gameService.GetAllGames();

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            var model = GamesModel.CreateGameModel(models, UserHelper.IsAdmin(User, context));

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

            var model = GamesModel.CreateGameModel(models, UserHelper.IsAdmin(User, context));

            SetGenresDevelopers();

            return PartialView("Partial/GamesPartial", model);
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

            var model = GamesModel.CreateGameModel(models, UserHelper.IsAdmin(User, context));

            return PartialView("Partial/GamesPartial", model);
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            var game = gameService.GetGameById(id);

            var model = mapper.Map<Game, GameViewModel>(game);

            return View(model);
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

        private void SetGenresDevelopers()
        {
            ViewBag.Genres = genreService.GetGenresNames();
            ViewBag.Developers = developerService.GetDevelopersNames();
        }
    }
}