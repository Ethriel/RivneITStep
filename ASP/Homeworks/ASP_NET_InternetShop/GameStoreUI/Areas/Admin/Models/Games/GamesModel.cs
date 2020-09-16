using System.Collections.Generic;

namespace GameStoreUI.Areas.Admin.Models.Games
{
    public class GamesModel
    {
        public IEnumerable<GameViewModel> Games { get; set; }
        public bool IsAdmin { get; set; }
        public static GamesModel CreateGameModel(IEnumerable<GameViewModel> games, bool isAdmin)
        {
            return new GamesModel
            {
                Games = games,
                IsAdmin = isAdmin
            };
        }
    }
}