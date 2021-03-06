﻿using System.ComponentModel.DataAnnotations;

namespace GameStoreUI.Areas.Admin.Models.Developers
{
    public class CreateDeveloperViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}