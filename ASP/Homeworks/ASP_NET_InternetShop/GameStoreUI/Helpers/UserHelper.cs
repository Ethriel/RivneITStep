using GameStoreDAL;
using GameStoreDAL.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;

namespace GameStoreUI.Helpers
{
    public static class UserHelper
    {
        public static bool IsAdmin(IPrincipal user, DbContext context)
        {
            var id = user.Identity.GetUserId();

            if (id == null)
            {
                return false;
            }

            var roleId = context.Set<IdentityUserRole>()
                                .FirstOrDefault(x => x.UserId.Equals(id)).RoleId;

            var role = context.Set<GameStoreRole>()
                              .FirstOrDefault(x => x.Id.Equals(roleId));

            return role.Name.Equals("Admin");
        }
    }
}