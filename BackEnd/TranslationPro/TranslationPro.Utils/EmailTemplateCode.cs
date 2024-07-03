

namespace TranslationPro.Utils
{
    public struct EmailTemplateCode
    {
        static public string code = "trans-pro";
        public struct Customer
        {
            /// <summary>03001会員登録</summary>
            static public string register = "03001";
            /// <summary>03002Reissue a password</summary>
            static public string resetPW = "03002";
            /// <summary>03003見積（自動見積）</summary>
            static public string mitumori = "03003";
            /// <summary>03004見積の確認E-mail（ｺｰﾃﾞｨﾈｰﾀｰ）</summary>
            static public string mitumori_cordy = "03004";
            /// <summary>03006Translator arranged notice</summary>
            public static string noticeStart = "03006";
            /// <summary>03007Translation delivery notice</summary>
            static public string noticeEnd = "03007";
            /// <summary>03008Request translation to a translator you choose</summary>
            static public string noticeEval = "03008";
            /// <summary>03009Message notice</summary>
            static public string newMessage = "03009";
            /// <summary>03010書類発送のNotice</summary>
            static public string sendMonthlyInvoiceMail = "03010";
            /// <summary>03011Bill送信</summary>
            static public string seikyuMonth = "03011";
            /// <summary>03012審査OK→Translationスタート</summary>
            static public string DeferredPayment = "03012";
            /// <summary>03013Translator not confirmed</summary>
            static public string notFound = "03013";
            /// <summary>03014AuthorizerへのE-mail</summary>
            static public string approval = "03014";
            /// <summary>03015決裁承認のNotice</summary>
            static public string allow_approval = "03015";
            /// <summary>03016休眠ユーザー3ヶMonth</summary>
            static public string sleep1month = "03016";
            /// <summary>03017休眠ユーザー6ヶMonth</summary>
            static public string sleep6month = "03017";
            /// <summary>03018休眠ユーザー12ヶMonth</summary>
            static public string sleep12month = "03018";
            /// <summary>03021仮見積もりのまま</summary>
            static public string noOrder = "03021";
            static public string weeksAfterEvaluation = "03020";
            static public string reissuePW = "03002";
            static public string show_Estimate = "03003";
            static public string inappropriate_Message = "03022";
            static public string confirm_Order = "03023";
            static public string Estimate_coordinator = "03004";
            /// <summary>
            /// auto email to customer when customer cancel the order
            /// </summary>
            static public string OrderCancelledByCustomer = "03026";
            /// <summary>
            /// When we register claim information from ERP(orderweb details page)
            /// , we sent e-mail to our partner company
            /// , if related company or translator belongs to partner company
            /// </summary>
            static public string calimReportToAffiliateCom = "03045";
            /// <summary>
            /// Auto Email to Affiliate about Monthly Sales Report
            /// </summary>
            static public string affiliateMonthlySalesReport = "03046";
            /// <summary>
            /// "When client, who belongs to affiliate company, selected post pay and order. (available only in Japanes version)"
            /// </summary>
            static public string affiliateCompanyPostPayOrder = "03047";
        }
        public struct Translator
        {
            /// <summary>04001会員登録</summary>
            static public string register = "04001";
            /// <summary>04002Reissue a password</summary>
            static public string resetPW = "04002";
            /// <summary>04003Translation打診（E-mail用）</summary>
            static public string request_light = "04003";
            /// <summary>04012Translation打診（E-mail用）EXPERT</summary>
            static public string request_expert = "04012";
            /// <summary>04013Translation打診（E-mail用）BUSINESS</summary>
            static public string request_business = "04013";
            /// <summary>04004Appointed translator打診</summary>
            static public string request_selected = "04004";
            /// <summary>04005Order accepted notice</summary>
            static public string notice_accept = "04005";
            /// <summary>04006Late delivery notice</summary>
            static public string notice_remind = "04006";
            /// <summary>04007　Deliver完了</summary>
            static public string noticeEnd = "04007";
            /// <summary>04008　Account information登録のお願い</summary>
            static public string bankinfo = "04008";
            /// <summary>04009Message notice</summary>
            static public string newMessage = "04009";
            /// <summary>04010 Registration e-mail 確認(認証コード)</summary>
            static public string registNewMail = "04010";
            /// <summary>04010 Process inspection between deadline</summary>
            static public string notice_halfTime = "04011";
            /// <summary>04014 Deliver遅れ：10分以内</summary>
            static public string alert_TardinessUnder10m = "04014";
            /// <summary>04015 Deliver遅れ：10分以上</summary>
            static public string alert_TardinessOver10m = "04015";
            /// <summary>04015 Deliver遅れ：10分以上</summary>
            static public string alert_TranslatorTardinessOver10m = "03003068";
            static public string notice_FromTranspro = "04016";
            static public string request_ToDelete = "04017";
            static public string translator_email = "04003";
            static public string reissuePW = "04002";
            /// <summary>
            /// Deadline has Expired (Notifying Late Delivery)
            /// </summary>
            static public string NotifyingLateDeliveryToTranslator = "03003068";

        }
        public struct SubAdmin
        {
            /// <summary>08002提携Application</summary>
            static public string application = "08002";
            /// <summary>08003クレイム報告</summary>
            static public string reportClaim = "08003";
            /// <summary>08004Month間売上報告</summary>
            static public string report_months = "08004";
            /// <summary>08005後払い審査要請</summary>
            static public string RequestReview = "08005";

        }
        public struct Administrator
        {
            /// <summary>09001不正キーワード通知</summary>
            static public string NG_Keyword = "09001";
            /// <summary>09002後払い審査要請</summary>
            static public string RequestReview = "09002";
            /// <summary>09003初めてのTranslator</summary>
            static public string FirstTime = "09003";
            /// <summary>09004評価Below 3.5</summary>
            static public string eval_Low = "09004";
            /// <summary>09005請求Postal mail</summary>
            static public string seikyu_post = "09005";
            /// <summary>
            /// Site Error Reporting
            /// </summary>
            static public string ErrorReporting = "03003056";
        }
        public struct Account
        {
            /// <summary></summary>
            static public string StaffPayment = "14001";
            /// <summary></summary>
            static public string ClientPayment = "14002";
            /// <summary></summary>
            static public string RequestForPayment = "14003";
            /// <summary></summary>
            static public string RequestBankInfo = "14004";

        }
        //Hiwork-System-HR : Code -> 13
        public struct HiworkHR
        {
            static public string HRDispatch = "13001";
            static public string HRInternationalExchange = "13002";
            //static public string StaffPayment = "14001";
        }
        public struct OfferEmailTempCode
        {
            const string _appointedTranslatortemplateCode = "04004";
            /// <summary> AppointedEmailTemplateCoe Expression bodied read only property </summary>
            public static string AppointedEmailTemplateCoe => _appointedTranslatortemplateCode;

            private const string _lightOfferEamilTempCode = "04003";
            /// <summary> Light Offer Email Template Code </summary>
            public static string LightOfferEmailTempCode => _lightOfferEamilTempCode;

            private static readonly string _businessOfferEmailTempCode = "04013";
            /// <summary> business Offer Email Template Code </summary>
            public static string BusinessOfferEmailTempCode => _businessOfferEmailTempCode;

            /// <summary> Expert Offer Email Template Code auto property </summary>
            public static string ExpertOfferEmailTempCode { get; } = "04012";

            public static string LightPriceTempCode { get; } = "04003";

            //this is applicable from C#7.0 with .Net version 4.6.2
            //private static string _emailTemplateCode;
            // public static string EmailTemplateCoe
            // {
            //     get => _emailTemplateCode;
            //     set => _emailTemplateCode = value;
            // }
        }

        public struct InquiryRequest
        {
            private const string _generalInquiryTemplateCode = "03024";
            public static string GeneralInquiryTemplateCode => _generalInquiryTemplateCode;
            private const string _affiliateRequestCode = "03025";
            public static string AffiliateRequestCode => _affiliateRequestCode;
        }

        public struct GroupCompanyEstimation
        {
            private const string GceTranslationInquiryEmailTemplateCode = "05101";
            public static string GceTranslationInquiryEmailCode => GceTranslationInquiryEmailTemplateCode;
            private const string GceTranslationEstimationEmailTemplateCode = "05001";
            public static string GceTranslationEstimationEmailCode => GceTranslationEstimationEmailTemplateCode;

            private const string GceInterpretationEstimationEmailTemplateCode = "05002";
            public static string GceInterpretationEstimationEmailCode => GceInterpretationEstimationEmailTemplateCode;
            private const string GceInterpretationInquiryEmailTemplateCode = "05102";
            public static string GceInterpretationInquiryEmailCode => GceInterpretationInquiryEmailTemplateCode;

            private const string GceShortTermDispatchEstimationEmailTemplateCode = "05003";
            public static string GceShortTermDispatchEstimationEmailCode => GceShortTermDispatchEstimationEmailTemplateCode;
            private const string GceShortTermDispatchInquiryEmailTemplateCode = "05103";
            public static string GceShortTermDispatchInquiryEmailCode => GceShortTermDispatchInquiryEmailTemplateCode;

            private const string GceTranslatorDispatchEstimationEmailTemplateCode = "05004";
            public static string GceTranslatorDispatchEstimationEmailCode => GceTranslatorDispatchEstimationEmailTemplateCode;
            private const string GceTranslatorDispatchInquiryEmailTemplateCode = "05104";
            public static string GceTranslatorDispatchInquiryEmailCode => GceTranslatorDispatchInquiryEmailTemplateCode;

            private const string GceNarratorDispatchInquiryEmailTemplateCode = "05105";
            public static string GceNarratorDispatchInquiryEmailCode => GceNarratorDispatchInquiryEmailTemplateCode;
            private const string GceNarratorDispatchEstimationEmailTemplateCode = "05005";
            public static string GceNarratorDispatchEstimationEmailCode => GceNarratorDispatchEstimationEmailTemplateCode;
            
            private const string GceSchoolDispatchInquiryEmailTemplateCode = "05106";
            public static string GceSchoolDispatchInquiryEmailCode => GceSchoolDispatchInquiryEmailTemplateCode;
            private const string GceSchoolDispatchEstimationEmailTemplateCode = "05006";
            public static string GceSchoolDispatchEstimationEmailCode => GceSchoolDispatchEstimationEmailTemplateCode;

            private const string GceDTPEstimationEmailTemplateCode = "05007";
            public static string GceDTPEstimationEmailCode => GceDTPEstimationEmailTemplateCode;
            private const string GceDTPInquiryEmailTemplateCode = "05107";
            public static string GceDTPInquiryEmailCode => GceDTPInquiryEmailTemplateCode;

            private const string GceNarrationInquiryEmailTemplateCode = "05108";
            public static string GceNarrationInquiryEmailCode => GceNarrationInquiryEmailTemplateCode;
            private const string GceNarrationEstimationEmailTemplateCode = "05008";
            public static string GceNarrationEstimationEmailCode => GceNarrationEstimationEmailTemplateCode;

            private const string GceTranscriptionEstimationEmailTemplateCode = "05009";
            public static string GceTranscriptionEstimationEmailCode => GceTranscriptionEstimationEmailTemplateCode;
            private const string GceTranscriptionInquiryEmailTemplateCode = "05109";
            public static string GceTranscriptionInquiryEmailCode => GceTranscriptionInquiryEmailTemplateCode;

            private const string GceProjectEstimationEmailTemplateCode = "05010";
            public static string GceProjectEstimationEmailCode => GceProjectEstimationEmailTemplateCode;
            private const string GceProjectInquiryEmailTemplateCode = "05110";
            public static string GceProjectInquiryEmailCode => GceProjectInquiryEmailTemplateCode;

            private const string GceFilmEditingInquiryEmailTemplateCode = "05111";
            public static string GceFilmEditingInquiryEmailCode => GceFilmEditingInquiryEmailTemplateCode;
            private const string GceFilmEditingEstimationEmailTemplateCode = "05011";
            public static string GceFilmEditingEstimationEmailCode => GceFilmEditingEstimationEmailTemplateCode;

            private const string GceETestGradingEmailTemplateCode = "05112";
            public static string GceETestGradingEmailCode => GceETestGradingEmailTemplateCode;
            //private static readonly string GceEditingEmailCode1 = "05113";

            private const string GceEditingEstimationEmailTemplateCode = "05013";
            public static string GceEditingEstimationEmailCode => GceEditingEstimationEmailTemplateCode;
            private const string GceEditingInquiryEmailTemplateCode = "05113";
            public static string GceEditingInquiryEmailCode => GceEditingInquiryEmailTemplateCode;

            private const string GceDispatchIntroductionInquiryEmailTemplateCode = "05114";
            public static string GceDispatchIntroductionInquiryEmailCode => GceDispatchIntroductionInquiryEmailTemplateCode;
            private const string GceDispatchIntroductionEstimationEmailTemplateCode = "05014";
            public static string GceDispatchIntroductionEstimationEmailCode => GceDispatchIntroductionEstimationEmailTemplateCode;
        }
    }
}
