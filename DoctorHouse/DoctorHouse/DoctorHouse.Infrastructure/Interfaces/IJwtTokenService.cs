using DoctorHouse.DLL.Entity;

namespace DoctorHouse.Infrastructure.Interfaces
{
    public interface IJwtTokenService
    {
        string CreateToken(DbUser user);
    }
}
