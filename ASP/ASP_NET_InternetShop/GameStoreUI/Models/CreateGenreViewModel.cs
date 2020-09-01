﻿using System.ComponentModel.DataAnnotations;

namespace GameStoreUI.Models
{
    public class CreateGenreViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}