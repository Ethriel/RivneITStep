using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using System.Collections.Generic;
using System.Linq;

namespace GameStoreBLL.Services.Implementation
{
    public class DeveloperService : IDeveloperService
    {
        private readonly IGenericRepository<Developer> devRepo;

        public DeveloperService(IGenericRepository<Developer> devRepo)
        {
            this.devRepo = devRepo;
        }
        public void CreateDeveloper(Developer developer)
        {
            devRepo.Create(developer);
        }

        public void DeleteDeveloper(int id)
        {
            var dev = devRepo.GetEntityById(id);
            devRepo.Delete(dev);
        }

        public IEnumerable<Developer> GetAllDevelopers()
        {
            return devRepo.GetAll();
        }

        public Developer GetDeveloperById(int id)
        {
            return devRepo.GetEntityById(id);
        }

        public IEnumerable<string> GetDevelopersNames()
        {
            var names = devRepo.GetAll()
                               .Select(x => x.Name)
                               .ToArray();

            return names;
        }

        public void UpdateDeveloper(Developer developer)
        {
            devRepo.Update(developer);
        }
    }
}
