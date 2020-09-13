using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Identity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace GameStoreUI.Controllers
{
    public class CartController : Controller
    {
        private readonly ICartService cartService;
        private readonly IGameService gameService;
        private readonly ApplicationUserManager userManager;

        public CartController(ICartService cartService, IGameService gameService, ApplicationUserManager userManager)
        {
            this.cartService = cartService;
            this.gameService = gameService;
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

        private ActionResult ReturnToGamesList()
        {
            return RedirectToAction("Index", "Games", new { area = "Admin" });
        }
    }
}