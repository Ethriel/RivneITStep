using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entity
{
    public class AppUser : IdentityUser
    {
        public virtual UserMoreInfo UserMoreInfo { get; set; }
    }
}
