﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DoctorHouse.DLL.Entity
{
    public class DbUser : IdentityUser<long>
    {
        [StringLength(255)]
        public string Image { get; set; }

        [Range(0, 130, ErrorMessage = "Invalid age")]
        public int Age { get; set; }

        [StringLength(255)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
