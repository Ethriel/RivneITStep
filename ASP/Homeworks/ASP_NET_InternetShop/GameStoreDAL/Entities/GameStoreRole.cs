using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace GameStoreDAL.Entities
{
    public class GameStoreRole : IdentityRole
    {
        public virtual ICollection<GameStoreUser> GameStoreUsers { get; set; }

        public GameStoreRole()
        {
            GameStoreUsers = new HashSet<GameStoreUser>();
        }
    }
}
