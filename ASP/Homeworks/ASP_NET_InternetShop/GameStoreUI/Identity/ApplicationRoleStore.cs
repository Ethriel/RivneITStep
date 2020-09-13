using GameStoreDAL.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace GameStoreUI.Identity
{
    public class ApplicationRoleStore : RoleStore<GameStoreRole>
    {
        public ApplicationRoleStore(DbContext context) : base(context)
        {

        }
    }
}