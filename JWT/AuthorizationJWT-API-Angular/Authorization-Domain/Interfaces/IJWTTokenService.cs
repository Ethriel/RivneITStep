using DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Authorization_Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string GenerateToken(AppUser user);
    }
}
