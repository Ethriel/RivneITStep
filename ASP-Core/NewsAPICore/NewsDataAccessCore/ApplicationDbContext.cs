using Microsoft.EntityFrameworkCore;
using NewsDataAccessCore.Entity;

namespace NewsDataAccessCore
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<News> News { get; set; }
    }
}
