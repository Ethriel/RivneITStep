using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DoctorHouse.DLL.Entity
{
    public class DbRole : IdentityRole<long>
    {
        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
