using GameStoreBLL.Filters;
using GameStoreDAL.Entities;
using System.Collections.Generic;

namespace GameStoreBLL.Services.Abstraction
{
    public interface IGameService
    {
        IEnumerable<Game> GetAllGames();
        void CreateGame(Game game);
        Game GetGameById(int id);
        void UpdateGame(Game game);
        void DeleteGame(int id);
        IEnumerable<Game> FindGamesByCriteria(string criteria);
        IEnumerable<Game> FilterGames(IList<GameFilter> gameFilters);
        IEnumerable<Game> GamesForHome();
    }
}
