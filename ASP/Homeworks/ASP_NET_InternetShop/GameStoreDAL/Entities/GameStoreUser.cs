using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace GameStoreDAL.Entities
{
    public class GameStoreUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual GameStoreRole GameStoreRole { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public GameStoreUser()
        {
            Orders = new HashSet<Order>();
        }
    }
}
