using GameStoreDAL.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace GameStoreUI.Identity
{
    public class ApplicationUserStore : UserStore<GameStoreUser>
    {
        public ApplicationUserStore(DbContext context) : base(context)
        {

        }
    }
}