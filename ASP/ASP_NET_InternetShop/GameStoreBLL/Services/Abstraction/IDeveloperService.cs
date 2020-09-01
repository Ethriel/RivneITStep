using GameStoreDAL.Entities;
using System.Collections.Generic;

namespace GameStoreBLL.Services.Abstraction
{
    public interface IDeveloperService
    {
        IEnumerable<Developer> GetAllDevelopers();
        void CreateDeveloper(Developer developer);
        IEnumerable<string> GetDevelopersNames();
        Developer GetDeveloperById(int id);
        void UpdateDeveloper(Developer developer);
        void DeleteDeveloper(int id);
    }
}
