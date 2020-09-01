using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using System.Collections.Generic;
using System.Linq;

namespace GameStoreBLL.Services.Implementation
{
    public class GenreService : IGenreService
    {
        private readonly IGenericRepository<Genre> genreRepo;

        public GenreService(IGenericRepository<Genre> genreRepo)
        {
            this.genreRepo = genreRepo;
        }
        public void CreateGenre(Genre genre)
        {
            genreRepo.Create(genre);
        }

        public void DeleteGenre(int id)
        {
            var genre = GetGenreById(id);
            genreRepo.Delete(genre);
        }

        public IEnumerable<Genre> GetAllGenres()
        {
            return genreRepo.GetAll();
        }

        public Genre GetGenreById(int id)
        {
            return genreRepo.GetEntityById(id);
        }

        public IEnumerable<string> GetGenresNames()
        {
            var names = genreRepo.GetAll()
                                 .Select(x => x.Name)
                                 .ToArray();

            return names;
        }

        public void UpdateGenre(Genre genre)
        {
            genreRepo.Update(genre);
        }
    }
}
