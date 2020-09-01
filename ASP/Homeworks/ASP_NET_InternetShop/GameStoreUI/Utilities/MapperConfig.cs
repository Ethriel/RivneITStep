using AutoMapper;
using GameStoreDAL.Entities;
using GameStoreUI.Helpers;
using GameStoreUI.Models;
using System.Linq;

namespace GameStoreUI.Utilities
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            GameConfig();
            DeveloperConfig();
            GenreConfig();
        }

        private void GameConfig()
        {
            CreateMap<Game, GameViewModel>()
                .ForMember(x => x.Genre, opt => opt.MapFrom(x => x.Genre.Name))
                .ForMember(x => x.Developer, opt => opt.MapFrom(x => x.Developer.Name))
                .ForMember(x => x.Image, opt => opt.MapFrom(x => string.Concat(Config.Domain, Config.GamesImagesOut, "\\", x.Image)));

            CreateMap<GameViewModel, Game>();

            CreateMap<CreateGameViewModel, Game>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.Genre, opt => opt.MapFrom(x => new Genre { Name = x.Genre }))
                .ForMember(x => x.Developer, opt => opt.MapFrom(x => new Developer { Name = x.Developer }));

            CreateMap<Game, EditGameViewModel>()
                .ForMember(x => x.Genre, opt => opt.MapFrom(x => x.Genre.Name))
                .ForMember(x => x.Developer, opt => opt.MapFrom(x => x.Developer.Name));

            CreateMap<EditGameViewModel, Game>()
                .ForMember(x => x.Genre, opt => opt.MapFrom(x => new Genre { Name = x.Genre }))
                .ForMember(x => x.Developer, opt => opt.MapFrom(x => new Developer { Name = x.Developer }));
        }

        private void DeveloperConfig()
        {
            CreateMap<Developer, DeveloperViewModel>()
                .ForMember(x => x.GamesCount, opt => opt.MapFrom(x => x.Games.Count()));

            CreateMap<DeveloperViewModel, Developer>();

            CreateMap<CreateDeveloperViewModel, Developer>();

            CreateMap<Developer, EditDeveloperViewModel>();

            CreateMap<EditDeveloperViewModel, Developer>();
        }

        private void GenreConfig()
        {
            CreateMap<Genre, GenreViewModel>()
                .ForMember(x => x.GamesCount, opt => opt.MapFrom(x => x.Games.Count()));

            CreateMap<GenreViewModel, Genre>();

            CreateMap<CreateGenreViewModel, Genre>();

            CreateMap<Genre, EditGenreViewModel>();

            CreateMap<EditGenreViewModel, Genre>();
        }
    }
}