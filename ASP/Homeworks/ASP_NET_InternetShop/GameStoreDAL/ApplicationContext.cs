using GameStoreDAL.Entities;
using GameStoreDAL.Initializer;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace GameStoreDAL
{
    public class ApplicationContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Developer> Developers { get; set; }
        public ApplicationContext()
            : base("name=GamesConnectionString")
        {
            //Database.SetInitializer(new GamesInitializer());
        }
    }
}
