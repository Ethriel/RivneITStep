using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Games;
using GameStoreUI.Identity;
using GameStoreUI.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace GameStoreUI.Controllers
{
    [Authorize]
    public class CartController : Controller
    {
        private readonly ICartService cartService;
        private readonly IGameService gameService;
        private readonly IMapper mapper;
        private readonly ApplicationUserManager userManager;

        public CartController(ICartService cartService, IGameService gameService, IMapper mapper, ApplicationUserManager userManager)
        {
            this.cartService = cartService;
            this.gameService = gameService;
            this.mapper = mapper;
            this.userManager = userManager;
        }
        [HttpGet]
        public ActionResult AddToCart(int gameId)
        {
            if (Session["GamesCart"] == null)
            {
                Session["GamesCart"] = new List<Game>();
            }

            var cart = Session["GamesCart"] as ICollection<Game>;

            var game = gameService.GetGameById(gameId);

            cart.Add(game);

            Session["GamesCart"] = cart;

            return ReturnToGamesList();
        }
        [HttpPost]
        public ActionResult RemoveOrder(int id)
        {
            cartService.RemoveOrder(id);

            return ReturnToGamesList();
        }

        [HttpGet]
        public async Task<ActionResult> SumbitPurchase()
        {
            var cart = Session["GamesCart"] as ICollection<Game>;

            var userId = User.Identity.GetUserId();

            var user = await userManager.FindByIdAsync(userId);

            var order = new Order
            {
                Games = cart,
                IsDone = false,
                OrderDate = DateTime.Now.ToShortDateString(),
                OrderStatus = cartService.GetDefaultOrderStatus(),
                GameStoreUser = user,
                TotalPrice = cart.Sum(x => x.Price)
            };

            cartService.AddOrder(order);

            return ReturnToGamesList();
        }

        [HttpGet]
        public ActionResult ShowCart()
        {
            var cart = Session["GamesCart"] as ICollection<Game>;

            var games = mapper.Map<IEnumerable<Game>, IEnumerable<GameViewModel>>(cart);

            var model = CartViewModel.Create(games, games.Sum(x => x.Price));

            return View(model);
        }

        [HttpGet]
        public ActionResult ClearCart()
        {
            var cart = Session["GamesCart"] as ICollection<Game>;

            if (cart != null)
            {
                cart.Clear();
                cart = null;
                Session["GamesCart"] = cart;
            }

            return ReturnToGamesList();
        }

        private ActionResult ReturnToGamesList()
        {
            return RedirectToAction("ListGames", "Home", new { area = "" });
        }
    }
}