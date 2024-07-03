using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TranslationPro.DAL
{
    public class TransProDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public TransProDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }
        public DbSet<EditingChargeSetting> EditingChargeSetting { get; set; }
        public DbSet<EditingPreference> EditingPreference { get; set; }
        public DbSet<EditorCertificationInfo> EditorCertificationInfo { get; set; }
        public DbSet<EditorPaymentSetting> EditorPaymentSetting { get; set; }
    }
}
