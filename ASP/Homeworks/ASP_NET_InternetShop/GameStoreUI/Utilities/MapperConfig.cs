using AutoMapper;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Developers;
using GameStoreUI.Areas.Admin.Models.Games;
using GameStoreUI.Areas.Admin.Models.Genres;
using GameStoreUI.Areas.Admin.Models.Orders;
using GameStoreUI.Helpers;
using System.Linq;
using System.Web;

namespace GameStoreUI.Utilities
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            GameConfig();
            DeveloperConfig();
            GenreConfig();
            OrderConfig();
        }

        private void GameConfig()
        {
            CreateMap<Game, GameViewModel>()
                .ForMember(x => x.Genre, opt => opt.MapFrom(x => x.Genre.Name))
                .ForMember(x => x.Developer, opt => opt.MapFrom(x => x.Developer.Name))
                .ForMember(x => x.Image, opt => opt.MapFrom(x => string.Concat(Config.GetUri(HttpContext.Current.Request), Config.GamesImagesOut, x.Image)));

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

        private void OrderConfig()
        {
            CreateMap<Order, OrderViewModel>()
                .ForMember(x => x.GameStoreUser, opt => opt.MapFrom(x => x.GameStoreUser.Email))
                .ForMember(x => x.OrderStatus, opt => opt.MapFrom(x => x.OrderStatus.Name))
                .ForMember(x => x.IsDone, opt => opt.MapFrom(x => x.IsDone.Equals(true) ? "Yes" : "No"));
        }
    }
}