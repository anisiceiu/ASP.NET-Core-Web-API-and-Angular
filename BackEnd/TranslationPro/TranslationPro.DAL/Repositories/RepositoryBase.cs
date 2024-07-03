using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TranslationPro.DAL.Repositories
{
    public abstract class RepositoryBase<T> :  IRepository<T> where T : class
    {
        protected readonly DbContext _context;
        protected DbSet<T> dbSet;
        private readonly IUnitOfwork _unitOfWork;

        public RepositoryBase(IUnitOfwork unitOfwork)
        {
            _unitOfWork = unitOfwork;
            dbSet = _unitOfWork.Context.Set<T>();
        }

        public async Task<IEnumerable<T>> Get()
        {
            var data = await dbSet.ToListAsync();
            return data;
        }

        public async Task<T> Create(T entity)
        {
            dbSet.Add(entity);
            await _unitOfWork.SaveChangesAsync();
            return entity;
        }

        public async Task Update(int id, T entity)
        {

            var existingOrder = await dbSet.FindAsync(id);

            _unitOfWork.Context.Entry(existingOrder).CurrentValues.SetValues(entity);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

        }

        //Delete Request
        public async Task Delete(int id)
        {
            var data = await dbSet.FindAsync(id);
            if(data != null)
            dbSet.Remove(data);
            await _unitOfWork.SaveChangesAsync();
            
        }
    }
}
