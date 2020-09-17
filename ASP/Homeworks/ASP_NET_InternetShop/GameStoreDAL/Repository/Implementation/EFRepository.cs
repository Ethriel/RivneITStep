using GameStoreDAL.Repository.Abstraction;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;

namespace GameStoreDAL.Repository.Implementation
{
    public class EFRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DbContext context;
        private readonly DbSet<TEntity> set;

        public EFRepository(DbContext context)
        {
            this.context = context;
            set = context.Set<TEntity>();
        }
        public void Create(TEntity entity)
        {
            set.Add(entity);
            CommitChanges();
        }

        public void Delete(TEntity entity)
        {
            set.Remove(entity);
            CommitChanges();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return set.AsEnumerable();
        }

        public void Update(TEntity entity)
        {
            set.AddOrUpdate(entity);
            CommitChanges();
        }
        public void CommitChanges()
        {
            context.SaveChanges();
        }

        public TEntity GetEntityById(int id)
        {
            return set.Find(id);
        }

        public IEnumerable<TEntity> FilterEntities(Expression<Func<TEntity, bool>> filter)
        {
            return set.Where(filter).AsEnumerable();
        }

        public IEnumerable<TEntity> GetAllWithIncludes(params Expression<Func<TEntity, object>>[] includes)
        {
            var query = set.AsQueryable();

            return includes.Aggregate(query, (current, includeProp) => current.Include(includeProp));
        }

        public void DeleteMultiple(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                set.Remove(entity);
            }

            CommitChanges();
        }
    }
}
