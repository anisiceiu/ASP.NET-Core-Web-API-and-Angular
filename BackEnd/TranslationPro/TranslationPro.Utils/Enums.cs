namespace TranslationPro.Utils
{
    public enum USERTYPE : long
    {
        SuperAdmin = 1,
        Employee,
        Maintenance,
        Guest,
        HR,
        Accountant,
        Translator
    }

    public enum TransproUserType
    {
        Customer = 1,
        Translator = 2,
        Partner = 3
    }

    public enum EstimationType
    {
        Translation = 1,
        Interpreter = 2,
        SchoolExcursion = 3,
        ShortTermDispatch = 4,
        Project = 5,
        DTP = 6,
        Narration = 7,
        WebCreation = 8,
        Transcription = 9,
        OverHeadCost = 10,
        JobSearcher = 11,
        Transpro = 12,
        Distpatch = 13,
        Introduction = 1005,
        EditingPro = 14,
        InternationalExchange = 1006,
        HRProject=1009,
        TeacherDispatch=1010
    }

    public enum ApplicationType
    {
        ERP = 1,
        TransPro = 2,
        EditingPro = 3,
        TransProJapan = 4,
        TransproKorea = 5,
        TransproAus = 6
    }

    public enum EstimationStatus
    {
        Under_estimation = 1,
        Waiting_for_approval = 2,
        Approved = 3,
        Waiting_for_confirmation = 4,
        Ordered = 5,
        Under_arrangement = 6,
        In_progress = 7,
        Delivered = 8,
        Invoice_completed = 9,
        Waiting_for_deposit = 10,
        Not_deposited = 11,
        Order_Completed = 12,
        Complaint = 13,
        Cancel = 14,
        Deleted = 15
    }

    public enum OrderOperationType
    {
        ACCEPT,
        DELIVERY,
        PAYMENT_COMPLETE,
        POST_PAY,
        POST_PAY_APPROVED,
        POST_PAY_DECLINED,
        CANCEL,
        EVALUATION,
        SECOND_EDITOR_DELIVERY,
        ORDER_CREATED,
        REJECT
    }

    public enum OrderStatus
    {
        UnderEstimation = 1,
        WaitingForApproval = 2,
        WaitingForConfirmation = 3,
        Ordered = 4,
        UnderArrangement = 5,
        InProgress = 6,
        Delivered = 7,
        InvoiceCompleted = 8,
        WaitingForDeposit = 9,
        NotDeposited = 10,
        OrderCompleted = 11,
        Complaint = 12,
        Cancel = 13,
        Deleted = 14
    }

    public enum PaymentStatusWeb
    {
        Unpaid = 0,
        Paid = 1
    }

    public enum EstimationApprovalStatus
    {
        Read = 1,
        Unread = 2,
        Clicked = 3,
        Approved = 4,
    }

    public enum CertificateType
    {
        IssuedByTranslator = 1,
        IssuedByCompany = 2
    }

    public enum MessageStatus
    {
        Sent = 1,
        Unread = 2,
        Read = 3,
        Replied = 4
    }

    public enum CompanyRegistrationType
    {
        Individual = 8,
        LegalEntity = 4,
        Public = 7
    }

    public enum TranslationType
    {
        Online = 1,
        Appointed = 2,
        NativeCheck = 3,
        TranslatorCoordinator = 4,
        None=0
    }

    public enum WebOrderStatus
    {
        WaitingForConfirmation = 1,
        WaitingForPostpayApproval = 13,
        Arranging = 2,
        Ordered = 3,
        WaitingForStaffConfirmation = 4,
        InProgress = 5,
        Delivered = 6,
        Evaluated = 7,
        WaitingForDeposit = 8,
        OrderCompleted = 9,
        Complaint = 10,
        Cancel = 11,
        Deleted = 12,
        FirstEditorRecruitment = 14,
        FirstEditorWorking = 15,
        FirstEditorDelivered = 16,
        SecondEditorRecruitment = 17,
        SecondEditorWorking = 18,
        SecondEditorDelivered = 19
    }

    public enum StaffType
    {
        Translator = 1,
        Narrator = 2,
        Interpretor = 3,
        Coordinator = 4,
        RealTime_STAFF = 5,
        Editor=6
    }

    public enum ClientType
    {
        Staff,
        Company,
        Bcause
    }

    public enum PaymentMethod
    {
        CreditCard_IPS = 1,
        CreditCard_Stripe = 5,
        MonthlyPayment = 2,
        RequestedPayment = 3,
        PayPal = 4,
        AliPay = 6,
        Bank = 7,
        CreditCard=10,
        PostOffice=8,
        Others=9
    }

    public enum PaymentStatus
    {
        Unpaid = 0,
        Paid = 1,
        UnRecoverable=2,
    }

    public enum StripePaymentStatus
    {
        succeeded,
        pending,
        failed
    }

    public enum StripeSourceObjectStatus
    {
        chargeable,
        failed,
        canceled
    }

    public enum DocumentCountType
    {
        CharacterCount = 2,
        WordCount = 1,
        MixedCount = 3
    }

    public enum TranslationLevelType
    {
        Light = 1,
        Business = 2,
        Expert = 3
    }

    public enum DeliveryPlanType
    {
        Thirtyminutes = 1,
        Ninetyminutes = 2,
        Fourhours = 3,
        TwelveHours = 4
    }
    public enum BannerPosition
    {
        TOPtop=1,
        TopMiddleLeft = 2,
        TopMiddleRight = 3,
        BottomBanner = 4,
        Footer1=5,
        Footer2=6
    }
    public enum ApplicationPortion
    {
        PRbanner = 1,
        JobSearch = 2,
        Jobdeails = 3,
        StaffMyPage = 4,
        CompanyMypageFree=5,
        CompanyMypagePay = 6,
        HOTJobs=7,
        Featurejobs=8
    }
    public enum PostingStatus
    {
        TemporaryRegistration=1,
        Posted=2,
        Closed=3
    }

    public enum EditingProUserType
    {
        Customer = 1,
        Editor = 2,
        Partner = 3
    }

    public enum EmailServiceConsumerSite
    {
        JAndMContent=1
    }


    public enum EnglishLanguageType
    {
        BritishEnglish = 1,
        AmericanEnglish = 2,
        AustralianEnglish = 3,
        Others = 4
    }
}
