

namespace TranslationPro.BLL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class EditingChargeSettingModel
    {
        public int ID { get; set; }
        public decimal BaseCharge { get; set; }
        public string CurrencyCode { get; set; }
        public decimal Light { get; set; }
        public decimal Business { get; set; }
        public decimal Expert { get; set; }
        public decimal SingleEditor { get; set; }
        public decimal DoubleEditor { get; set; }
        public decimal SpellCheckYES { get; set; }
        public decimal SpellCheckNO { get; set; }
        public decimal GrammerCheckYES { get; set; }
        public decimal GrammerCheckNO { get; set; }
        public decimal WordingYES { get; set; }
        public decimal WordingNO { get; set; }
        public decimal EditingHistoryYES { get; set; }
        public decimal EditingHistoryNO { get; set; }
        public decimal EditingHistoryBoth { get; set; }
        public decimal MachineTranslatedYES { get; set; }
        public decimal MachineTranslatedNO { get; set; }
        public decimal CrossCheckYES { get; set; }
        public decimal CrossCheckNO { get; set; }
        public decimal ExpressDelivery { get; set; }
        public decimal EarlyDelivery { get; set; }
        public decimal NormalDelivery { get; set; }
        public decimal LateDelivery { get; set; }
        public decimal LanguageEN { get; set; }
        public decimal LanguageKR { get; set; }
        public decimal LanguageCN { get; set; }
        public decimal LanguageJP { get; set; }
        public decimal LanguageOthers { get; set; }
        public decimal ContractsLegalArea { get; set; }
        public decimal MedicalPharmaceuticalArea { get; set; }
        public decimal PatentIntellectualArea { get; set; }
        public decimal FamilyRegisterCertificateArea { get; set; }
        public decimal OthersArea { get; set; }
        public decimal TaxRate { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<decimal> NormalDocumentsArea { get; set; }
    }
}
