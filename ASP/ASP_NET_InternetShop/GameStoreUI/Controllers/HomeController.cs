using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GameStoreUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGameService gameService;
        private readonly IMapper mapper;

        public HomeController(IGameService gameService, IMapper mapper)
        {
            this.gameService = gameService;
            this.mapper = mapper;
        }
        public ActionResult Index()
        {
            var games = gameService.GamesForHome();

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            return View(models);
        }
    }
}