using Binbin.Linq;
using GameStoreBLL.Filters;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace GameStoreBLL.Services.Implementation
{
    public class GameService : IGameService
    {
        private readonly IGenericRepository<Game> gamesRepo;
        private readonly IGenericRepository<Genre> genreRepo;
        private readonly IGenericRepository<Developer> devRepo;

        public GameService(IGenericRepository<Game> gamesRepo, IGenericRepository<Genre> genreRepo, IGenericRepository<Developer> devRepo)
        {
            this.gamesRepo = gamesRepo;
            this.genreRepo = genreRepo;
            this.devRepo = devRepo;
        }

        public void CreateGame(Game game)
        {
            var genre = GetGenreByName(game.Genre.Name);

            var developer = GetDeveloperByName(game.Developer.Name);

            game.Genre = genre;

            game.Developer = developer;

            gamesRepo.Create(game);
        }

        public IEnumerable<Game> GetAllGames()
        {
            return gamesRepo.GetAll();
        }

        public Game GetGameById(int id)
        {
            return gamesRepo.GetEntityById(id);
        }

        public void UpdateGame(Game game)
        {
            var genre = GetGenreByName(game.Genre.Name);

            var developer = GetDeveloperByName(game.Developer.Name);

            game.Genre = genre;

            game.Developer = developer;

            gamesRepo.Update(game);
        }

        private Genre GetGenreByName(string name)
        {
            var genre = genreRepo.GetAll()
                                 .FirstOrDefault(x => x.Name
                                                       .Equals(name));

            return genre;
        }
        public void DeleteGame(int id)
        {
            var game = gamesRepo.GetEntityById(id);

            gamesRepo.Delete(game);
        }
        public IEnumerable<Game> FindGamesByCriteria(string criteria)
        {
            criteria = criteria.ToLower();

            var games = GetAllGames();

            var selected = games.Where(x => x.Name.ToLower().Contains(criteria))
                                .ToArray();

            return selected;
        }

        public IEnumerable<Game> FilterGames(IList<GameFilter> gameFilters)
        {
            var games = default(IEnumerable<Game>);

            var predicates = new List<Expression<Func<Game, bool>>>();

            var groupedTypes = gameFilters.GroupBy(x => x.Type);

            var predicate = default(Expression<Func<Game, bool>>);
            if (gameFilters.Any())
            {
                foreach (var type in groupedTypes)
                {
                    predicate = PredicateBuilder.Create(type.First().Predicate);

                    for (int i = 1; i < type.Count(); i++)
                    {
                        predicate = predicate.Or(type.ToArray()[i].Predicate);
                    }
                    predicates.Add(predicate);

                }

                var resPredicate = PredicateBuilder.Create(predicates[0]);

                for (int i = 1; i < predicates.Count; i++)
                {
                    resPredicate = resPredicate.And(predicates[i]);
                }

                games = gamesRepo.FilterEntities(resPredicate);
            }
            else
            {
                games = gamesRepo.GetAll();
            }


            return games;
        }

        private Developer GetDeveloperByName(string name)
        {
            var developer = devRepo.GetAll()
                                   .FirstOrDefault(x => x.Name
                                                         .Equals(name));

            return developer;
        }

        public IEnumerable<Game> GamesForHome()
        {
            var rnd = new Random();

            var games = gamesRepo.GetAllWithIncludes(x => x.Developer, y => y.Genre);

            var forHome = games.OrderBy(x => rnd.Next())
                               .Take(5)
                               .ToArray();

            return forHome;
        }
    }
}
