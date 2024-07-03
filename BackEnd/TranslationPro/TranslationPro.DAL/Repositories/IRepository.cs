using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TranslationPro.DAL.Repositories
{
    public interface IRepository<T> where T : class
    {
        public Task<IEnumerable<T>> Get();
        public Task<T> Create(T entity);
        public Task Update(int id, T entity);
        public Task Delete(int id);
    }
}
