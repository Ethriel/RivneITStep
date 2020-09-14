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
        public DbSet<Comment> Comments { get; set; }
        //public DbSet<NewsComment> NewsComments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<News>()
                        .HasOne(n => n.Comment)
                        .WithOne(c => c.News)
                        .HasForeignKey<Comment>(c => c.NewsId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
