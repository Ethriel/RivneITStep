using GameStoreDAL.Entities;
using Microsoft.AspNet.Identity;

namespace GameStoreUI.Identity
{
    public class ApplicationRoleManager : RoleManager<GameStoreRole>
    {
        public ApplicationRoleManager(IRoleStore<GameStoreRole, string> store) : base(store)
        {

        }
    }
}