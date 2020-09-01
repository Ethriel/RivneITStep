﻿using AutoMapper;
using GameStoreBLL.Filters;
using GameStoreBLL.Services;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameStoreUI.Controllers
{
    public class GamesController : Controller
    {
        private readonly IGameService gameService;
        private readonly IDeveloperService developerService;
        private readonly IGenreService genreService;
        private readonly IMapper mapper;

        public GamesController(IGameService gameService, IDeveloperService developerService, IGenreService genreService, IMapper mapper)
        {
            this.gameService = gameService;
            this.developerService = developerService;
            this.genreService = genreService;
            this.mapper = mapper;
        }
        public ActionResult Index()
        {
            var games = gameService.GetAllGames();

            var models = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(games);

            SetGenresDevelopers();

            return View(models);
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
        public ActionResult Create(CreateGameViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Create();
            }
            var game = mapper.Map<CreateGameViewModel, Game>(model);

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
        public ActionResult Edit(EditGameViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Edit(model.Id);
            }

            var game = mapper.Map<EditGameViewModel, Game>(model);

            gameService.UpdateGame(game);

            return RedirectToAction(nameof(Index));
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            gameService.DeleteGame(id);

            return RedirectToAction(nameof(Index));
        }

        private void SetGenresDevelopers()
        {
            ViewBag.Genres = genreService.GetGenresNames();
            ViewBag.Developers = developerService.GetDevelopersNames();
        }
    }
}