using GameStoreUI.Areas.Admin.Models.Games;
using System.Collections.Generic;

namespace GameStoreUI.Models
{
    public class CartViewModel
    {
        public IEnumerable<GameViewModel> Games { get; set; }
        public int Total { get; set; }

        public static CartViewModel Create(IEnumerable<GameViewModel> games, int total)
        {
            return new CartViewModel
            {
                Games = games,
                Total = total
            };
        }
    }
}