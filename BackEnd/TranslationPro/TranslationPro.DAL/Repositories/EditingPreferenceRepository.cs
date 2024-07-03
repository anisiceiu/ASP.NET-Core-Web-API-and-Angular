using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TranslationPro.DAL;
using TranslationPro.DAL.Repositories;

namespace TranslationPro.DAL.Repositories
{

    public class EditingPreferenceRepository : RepositoryBase<EditingPreference>
    {
        private TransProDbContext _dbContext;

        public EditingPreferenceRepository(IUnitOfwork unitOfWork, TransProDbContext transProDbContext) : base(unitOfWork)
        {
            _dbContext = transProDbContext;
        }

    }
}
