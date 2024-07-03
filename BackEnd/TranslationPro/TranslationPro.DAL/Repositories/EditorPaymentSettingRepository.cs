
using TranslationPro.DAL;
using TranslationPro.DAL.Repositories;

namespace TranslationPro.DAL.Repositories
{

    public class EditorPaymentSettingRepository : RepositoryBase<EditorPaymentSetting>
    {
        private TransProDbContext _dbContext;

        public EditorPaymentSettingRepository(IUnitOfwork unitOfWork, TransProDbContext transProDbContext) : base(unitOfWork)
        {
            _dbContext = transProDbContext;
        }

    }
}
