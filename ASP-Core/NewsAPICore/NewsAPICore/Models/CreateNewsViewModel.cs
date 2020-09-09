using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsAPICore.Models
{
    public class CreateNewsViewModel
    {
        public string Title { get; set; }

        public string PostDate { get; set; }

        public string ImagePath { get; set; }

        public string Description { get; set; }
    }
}
