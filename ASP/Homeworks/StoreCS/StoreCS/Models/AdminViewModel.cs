using System.Collections.Generic;

namespace StoreCS.Models
{
    public class AdminViewModel
    {
        public IEnumerable<string> Roles { get; set; }
        public IEnumerable<UserViewModel> Users { get; set; }
    }
}