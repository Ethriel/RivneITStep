using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreCS.Areas.Manager.Models
{
    public class CreateNewsViewModel
    {
        [Required(ErrorMessage = "Header is required")]
        public string Header { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd'/'MM'/'yyyy}", ApplyFormatInEditMode = true)]
        public string Date { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }

        [Required(ErrorMessage = "Category is required")]
        public string Category { get; set; }
    }
}