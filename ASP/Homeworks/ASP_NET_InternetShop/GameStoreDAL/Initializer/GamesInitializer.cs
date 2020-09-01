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
                    Image="https://store-images.s-microsoft.com/image/apps.54937.66944972600899848.2db4b474-478c-4477-907a-83efddd67275.2b0030d3-b042-4574-b3af-85f2e4cf3f1b?mode=scale&q=90&h=1080&w=1920",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="https://cdnimg.rg.ru/img/content/161/19/41/warcraft3_d_850.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="https://store-images.s-microsoft.com/image/apps.62121.64148876922571625.4747b43e-3d86-49fc-aa97-ee00c70af4e5.763042e2-6d13-4a8a-a21d-b07d9f5f2cca?mode=scale&q=90&h=1080&w=1920",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="https://media.rockstargames.com/rockstargames-newsite/uploads/b4546f96a016d9da31a9353e9b38d6aafe984436.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="https://pic.sport.ua/images/news/0/11/29/orig_445827.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="https://avatars.mds.yandex.net/get-zen_doc/1950904/pub_5d72c05e4735a600aee9c7dc_5d72c072eb268200ad76f557/scale_1200",
                    Year=2020,
                    Genre=genres[5],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FarCry",
                    Description="FarCry info...",
                    Image="https://store-images.s-microsoft.com/image/apps.54937.66944972600899848.2db4b474-478c-4477-907a-83efddd67275.2b0030d3-b042-4574-b3af-85f2e4cf3f1b?mode=scale&q=90&h=1080&w=1920",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="https://cdnimg.rg.ru/img/content/161/19/41/warcraft3_d_850.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="https://store-images.s-microsoft.com/image/apps.62121.64148876922571625.4747b43e-3d86-49fc-aa97-ee00c70af4e5.763042e2-6d13-4a8a-a21d-b07d9f5f2cca?mode=scale&q=90&h=1080&w=1920",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="https://media.rockstargames.com/rockstargames-newsite/uploads/b4546f96a016d9da31a9353e9b38d6aafe984436.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="https://pic.sport.ua/images/news/0/11/29/orig_445827.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="https://avatars.mds.yandex.net/get-zen_doc/1950904/pub_5d72c05e4735a600aee9c7dc_5d72c072eb268200ad76f557/scale_1200",
                    Year=2020,
                    Genre=genres[5],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FarCry",
                    Description="FarCry info...",
                    Image="https://store-images.s-microsoft.com/image/apps.54937.66944972600899848.2db4b474-478c-4477-907a-83efddd67275.2b0030d3-b042-4574-b3af-85f2e4cf3f1b?mode=scale&q=90&h=1080&w=1920",
                    Year=2015,
                    Genre=genres[1],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Warcraft III",
                    Description="Warcraft III info...",
                    Image="https://cdnimg.rg.ru/img/content/161/19/41/warcraft3_d_850.jpg",
                    Year=2003,
                    Genre=genres[4],
                    Developer=developers[6],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="Assassins Creed",
                    Description="Assassins Creed info...",
                    Image="https://store-images.s-microsoft.com/image/apps.62121.64148876922571625.4747b43e-3d86-49fc-aa97-ee00c70af4e5.763042e2-6d13-4a8a-a21d-b07d9f5f2cca?mode=scale&q=90&h=1080&w=1920",
                    Year=2018,
                    Genre=genres[2],
                    Developer=developers[2],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="GTA V",
                    Description="GTA V info...",
                    Image="https://media.rockstargames.com/rockstargames-newsite/uploads/b4546f96a016d9da31a9353e9b38d6aafe984436.jpg",
                    Year=2018,
                    Genre=genres[0],
                    Developer=developers[1],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="FIFA 20",
                    Description="FIFA 20 info...",
                    Image="https://pic.sport.ua/images/news/0/11/29/orig_445827.jpg",
                    Year=2020,
                    Genre=genres[3],
                    Developer=developers[0],
                    Price = rnd.Next(30, 70)
                },
                new Game
                {
                    Name="NFS",
                    Description="NFS info...",
                    Image="https://avatars.mds.yandex.net/get-zen_doc/1950904/pub_5d72c05e4735a600aee9c7dc_5d72c072eb268200ad76f557/scale_1200",
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
