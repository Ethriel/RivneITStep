using GameStoreDAL.Entities;
using System.Collections.Generic;

namespace GameStoreBLL.Services.Abstraction
{
    public interface IGenreService
    {
        IEnumerable<Genre> GetAllGenres();
        void CreateGenre(Genre genre);
        IEnumerable<string> GetGenresNames();
        Genre GetGenreById(int id);
        void UpdateGenre(Genre genre);
        void DeleteGenre(int id);
    }
}
