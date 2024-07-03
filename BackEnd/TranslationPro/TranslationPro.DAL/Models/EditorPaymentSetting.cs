
namespace TranslationPro.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class EditorPaymentSetting
    {
        public int ID { get; set; }
        public Nullable<bool> IsDoubleCheck { get; set; }
        public Nullable<decimal> FirstEditor { get; set; }
        public Nullable<decimal> SecondEditor { get; set; }
        public Nullable<decimal> ForAppointedProject { get; set; }
        public string PlanType { get; set; }
        public string DeliveryMode { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
    }
}
