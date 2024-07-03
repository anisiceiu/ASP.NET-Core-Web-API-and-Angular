
using TranslationPro.DAL;
using TranslationPro.DAL.Repositories;

namespace TranslationPro.DAL.Repositories
{

    public class EditingChargeSettingRepository : RepositoryBase<EditingChargeSetting>
    {
        private TransProDbContext _dbContext;

        public EditingChargeSettingRepository(IUnitOfwork unitOfWork, TransProDbContext transProDbContext) : base(unitOfWork)
        {
            _dbContext = transProDbContext;
        }
       
    }
}
