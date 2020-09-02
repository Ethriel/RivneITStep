using System.Configuration;

namespace StoreCS.Helpers
{
    public static class Config
    {
        public static string DefaultConnection { get => ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString; }
        public static string LocalConnection { get => ConfigurationManager.ConnectionStrings["LocalConnection"].ConnectionString; }
    }
}