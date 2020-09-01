using GameStoreDAL.Entities;
using System;
using System.Linq.Expressions;

namespace GameStoreBLL.Filters
{
    public class GameFilter
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public Expression<Func<Game, bool>> Predicate { get; set; }
    }
}
