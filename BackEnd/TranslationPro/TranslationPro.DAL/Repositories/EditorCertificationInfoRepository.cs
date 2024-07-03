
using TranslationPro.DAL;
using TranslationPro.DAL.Repositories;

namespace TranslationPro.DAL.Repositories
{

    public class EditorCertificationInfoRepository : RepositoryBase<EditorCertificationInfo>
    {
        private TransProDbContext _dbContext;

        public EditorCertificationInfoRepository(IUnitOfwork unitOfWork, TransProDbContext transProDbContext) : base(unitOfWork)
        {
            _dbContext = transProDbContext;
        }

    }
}
