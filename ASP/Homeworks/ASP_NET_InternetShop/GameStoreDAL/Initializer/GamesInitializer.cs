using GameStoreDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace GameStoreDAL.Initializer
{
    public class GamesInitializer : DropCreateDatabaseAlways<ApplicationContext>
    {
        protected override void Seed(ApplicationContext context)
        {
            var rnd = new Random();

            var genres = new List<Genre>
            {
                new Genre{Name="Action"},
                new Genre{Name="Shooter"},
                new Genre{Name="RPG"},
                new Genre{Name="Sport Simulator"},
                new Genre{Name="Strategy"},
                new Genre{Name="Racing"}
            };

            var developers = new List<Developer>
            {
                new Developer{Name="EA"},
                new Developer{Name="RockStar Games"},
                new Developer{Name="Ubisoft"},
                new Developer{Name="G&C Gameworlds"},
                new Developer{Name="Playrix"},
                new Developer{Name="Activision"},
                new Developer{Name="Blizzard"}
            };

            var games = new List<Game>
            {
                new Game
                {
                    Name="FarCry",
                    Description="FarCry info...",
                    Image="fc1.jpg",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="wc1.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="ac1.jpg",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="gta1.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="fifa1.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="nfs1.jpg",
                    Year=2020,
                    Genre=genres[5],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },

                new Game
                {
                    Name="FarCry",
                    Description="FarCry info...",
                    Image="fc2.jpg",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="wc2.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="ac2.jpg",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="gta2.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="fifa2.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="nfs2.jpg",
                    Year=2020,
                    Genre=genres[5],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },

                new Game
                {
                    Name="FarCry",
                    Description="FarCry info...",
                    Image="fc3.jpg",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="wc3.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="ac3.jpg",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="gta3.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="fifa3.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="nfs3.jpg",
                    Year=2020,
                    Genre=genres[5],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                }
            };

            context.Genres.AddRange(genres);
            context.Developers.AddRange(developers);
            context.Games.AddRange(games);
            context.SaveChanges();

            base.Seed(context);
        }
    }
}
