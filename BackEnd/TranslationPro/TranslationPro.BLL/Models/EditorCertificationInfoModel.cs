
namespace TranslationPro.BLL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class EditorCertificationInfoModel
    {
        public int ID { get; set; }
        public System.Guid StaffID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsContractedEditor { get; set; }
        public string EditorType { get; set; }
        public Nullable<bool> IsMedicalExpert { get; set; }
        public Nullable<bool> IsLegalExpert { get; set; }
        public Nullable<bool> IsPatentExpert { get; set; }
        public Nullable<bool> IsCertificateExpert { get; set; }
        public Nullable<bool> IsGeneralExpert { get; set; }
        public Nullable<bool> IsAllowAutoCertification { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<decimal> InternalScore { get; set; }
        public Nullable<System.DateTime> CanNotAcceptStartDate { get; set; }
        public Nullable<System.DateTime> CanNotAcceptEndDate { get; set; }
        public string SecondEditorCategory { get; set; }
    }
}
