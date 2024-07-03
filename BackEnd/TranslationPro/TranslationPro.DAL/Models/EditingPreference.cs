

namespace TranslationPro.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class EditingPreference
    {
        public int ID { get; set; }
        public int WordCount { get; set; }
        public Nullable<System.Guid> LanguageID { get; set; }
        public Nullable<System.Guid> SpecializedFieldID { get; set; }
        public bool IsSpellCheck { get; set; }
        public bool IsGrammerCheck { get; set; }
        public bool IsWording { get; set; }
        public Nullable<int> DeliveryTracingRecordID { get; set; }
        public bool IsDoubleCheck { get; set; }
        public bool IsAppointingEditor { get; set; }
        public Nullable<long> AppointedEditor1 { get; set; }
        public Nullable<long> AppointedEditor2 { get; set; }
        public Nullable<long> AppointedEditor3 { get; set; }
        public bool IsMachineTranslated { get; set; }
        public bool IsEditingComment { get; set; }
        public bool IsCrossCheck { get; set; }
        public bool IsTermCheck { get; set; }
        public bool IsWordElimination { get; set; }
        public bool IsLayoutOrganization { get; set; }
        public string OtherPreferredEditingMethod { get; set; }
        public string CommentsToEditor { get; set; }
        public string ReferenceFilePath { get; set; }
        public System.Guid OrderID { get; set; }
        public Nullable<int> PlanCourseID { get; set; }
        public string PurposeOfEditing { get; set; }
        public string DesiredEnglishType { get; set; }
        public string DirectionOfEditing { get; set; }
        public string EnglishTypeOthersName { get; set; }
        public string PurposeOthersName { get; set; }
        public string ReaderTargetDetails { get; set; }
        public string ReaderTargetType { get; set; }

    }
}
