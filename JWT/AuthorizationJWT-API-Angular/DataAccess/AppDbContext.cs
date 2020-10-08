using DataAccess.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<UserMoreInfo> UserMoreInfos { get; set; }
        public DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserMoreInfo>()
                   .ToTable("UserMoreInfos");

            builder.Entity<Product>()
                   .ToTable("Products");

            builder.Entity<AppUser>()
                   .HasOne(u => u.UserMoreInfo)
                   .WithOne(umi => umi.AppUser)
                   .HasForeignKey<UserMoreInfo>(umi => umi.Id);

            base.OnModelCreating(builder);
        }
    }
}
