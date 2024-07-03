angular.module('hiworkApp').component('webOrderEstimationTemplateWindowjp', {
    templateUrl: 'app/Components/WebOrderPDFTemplate/estimationTemplate_jp.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: invoiceTemplateController

});

invoiceTemplateController.$inject = ['$scope', '$rootScope', 'appSettings', 'AppStorage', 'sessionFactory', '$filter', 'ajaxService', '$http', '$uibModal', '$state', '$stateParams', '$timeout'];
function invoiceTemplateController($scope, $rootScope, appSettings, AppStorage, sessionFactory, $filter, ajaxService, $http, $uibModal, $state, $stateParams, $timeout) {

    var $ctrl = this;
    var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
    var currentUser = sessionFactory.GetObject(AppStorage.userData);
    $ctrl.obj = {};
    $ctrl.details = [];
    var options = { year: 'numeric', month: 'long', day: 'numeric' };




    $ctrl.downloadPdfTemplate = function () {

        angular.element(document).find('.input-template-interface').remove();
        var html = angular.element(document).find('.readonly-template-dom').html();
        var css = angular.element(document).find('.container-css').html();

        var model = {
            'EstimationModel': $ctrl.estimation,
            'Html': html,
            'Css': css
        };

        $http.post(appSettings.API_BASE_URL + 'transpro/generatepdf', model, { responseType: 'arraybuffer' })
            .then(function (data) {
                console.log(data);
                var file = new Blob([data.data], { type: 'application/pdf' });
                //fileURL = URL.createObjectURL(file);
                //window.open(fileURL);
                saveAs(file, 'Quotation.pdf');

            });
        $ctrl.Close();
    };



    $ctrl.$onInit = function () {

        $ctrl.model = {};
        $ctrl.title = $ctrl.resolve.title;
        $ctrl.weborder = $ctrl.resolve.weborder;
        $ctrl.order = $ctrl.resolve.order;
        $ctrl.weborder.DeliveryDate = new Date();
        var date = new Date();
        $ctrl.CurrentDate = date.toLocaleDateString('ja-JP', options);

        var addDays = date.setDate(date.getDate() + 30);
        var days = new Date(addDays);
        $ctrl.weborder.DeliveryDate = days.toLocaleDateString('ja-JP', options);

        $ctrl.StampURL = appSettings.API_BASE_URL + "Content/trans-pro_stamp.jpg";
        //set manual object value. this will come from estimation or order
        //var detailObj = { Remarks: 'English → English native check paper · academic · research and development Expert 24 hour course', AmountOfMoney: '17,888' };
        var detailObj = {
            Remarks: $ctrl.weborder.SourceLanguage + '→' + $ctrl.weborder.TargetLanguage + ' ' + $ctrl.weborder.TranslationTypeName + ' ', AmountOfMoney: $ctrl.weborder.EstimatedPrice, ConsumptionTax: $ctrl.weborder.ConsumptionTax
        }
        $ctrl.details.push(detailObj);
        $ctrl.TotalEstimatedPrice = 0;
        $ctrl.TotalConsumptionTax = 0;
        for (i = 0; i < $ctrl.details.length; i++) {
            $ctrl.TotalEstimatedPrice = Math.floor($ctrl.TotalEstimatedPrice + $ctrl.details[i].AmountOfMoney);
            $ctrl.TotalConsumptionTax = $ctrl.TotalConsumptionTax + $ctrl.details[i].ConsumptionTax;
        }
        $ctrl.TotalEstimatedPrice = Math.floor(($ctrl.TotalEstimatedPrice + $ctrl.TotalConsumptionTax) - $ctrl.TotalDiscountedAmount);

        //$ctrl.obj.PostCode = '〒8158540';
        $ctrl.obj.Title = '御 見 積 書';
        $ctrl.obj.PostCode = '8158540';
        $ctrl.obj.Address = '4-9-1 Shiobara, Minami-ku, Fukuoka city, Fukuoka prefecture';
        $ctrl.obj.ClientName = 'Kyushu University';
        $ctrl.obj.ClientPostCode = '';
        $ctrl.obj.PersonInCharge = 'Ms. Reiko Kamioka';
        $ctrl.obj.Company = '株式会社 ビーコス';
        $ctrl.obj.BranchCompany = '翻訳プロ(trans-Pro.) 事務局';
        $ctrl.obj.UserPostCode = '〒105-0013';
        $ctrl.obj.UserAddress = ' 東京都港区浜松町2-1-3 第二森ビル4F';
        $ctrl.obj.Contact = 'TEL.03-5408-9540 FAX.03-3433-3320';
        $ctrl.obj.Email = 'info@trans-pro.net';
        $ctrl.obj.DeliveryDate = $ctrl.weborder.DeliveryDate;
        $ctrl.obj.ProposalNo = '170113O001';
        $ctrl.obj.TotalPrice = '17,388';
        $ctrl.obj.PaymentDate = '2017/02/28';
        $ctrl.obj.ConsumptionTax = $ctrl.weborder.ConsumptionTax;
        $ctrl.obj.Total = $ctrl.weborder.EstimatedPrice;
        $ctrl.obj.Remarks1 = '見積有効期限は' + $ctrl.weborder.DeliveryDate + 'までです。';
        $ctrl.obj.Remarks2 = '';
        $ctrl.obj.Remarks3 = '';
        $ctrl.obj.AccountInfo1 = 'transfer destination: Sumitomo Mitsui Banking Corporation Hamamatsu-cho Branch 679 deposit type: Savings';
        $ctrl.obj.AccountInfo2 = 'Account Number: 7471947 Account Holder: Corporation Bikosu';
        $ctrl.obj.Conclusion1 = 'We are supporting International Business and Multicultural Communication';
        $ctrl.obj.Conclusion2 = "私たちは在住外国人のネットワークを活かし、海外ビジネスや国際交流をサポートします。";
        $ctrl.obj.Conclusion3 = "クラウド型オンライン翻訳の翻訳プロ(trans-Pro.) 15 言語対応、24,677 のネイティブ翻訳者が対応";
        $ctrl.obj.Greeting1 = 'この度は弊社サービスを初めてご利用いただき、大変ありがとうございます。';
        $ctrl.obj.Greeting2 = '下記の通りお見積申し上げます。';
        $ctrl.obj.Greeting3 = 'よろしくご検討いただきますようお願いいたします。';
    };
    $ctrl.Close = function () {
        $ctrl.modalInstance.close($ctrl.modalData);
    };

    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };

}

