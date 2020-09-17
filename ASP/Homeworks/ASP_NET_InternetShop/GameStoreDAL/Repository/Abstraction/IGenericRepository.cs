using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace GameStoreDAL.Repository.Abstraction
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        void Create(TEntity entity);
        void Delete(TEntity entity);
        void DeleteMultiple(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetAllWithIncludes(params Expression<Func<TEntity, object>>[] includes);
        TEntity GetEntityById(int id);
        IEnumerable<TEntity> FilterEntities(Expression<Func<TEntity, bool>> filter);
    }
}
