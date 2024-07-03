angular.module('hiworkApp').component('webOrderReceiptTemplateWindowjp', {
    templateUrl: 'app/Components/WebOrderPDFTemplate/receiptTemplate_jp.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: receiptTemplateController

});

receiptTemplateController.$inject = ['$scope', '$rootScope', 'appSettings', 'AppStorage', 'sessionFactory', '$filter', 'ajaxService', '$http', '$uibModal', '$state', '$stateParams', '$timeout'];
function receiptTemplateController($scope, $rootScope, appSettings, AppStorage, sessionFactory, $filter, ajaxService, $http, $uibModal, $state, $stateParams, $timeout) {

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
        $ctrl.StampURL = appSettings.API_BASE_URL + "Content/trans-pro_stamp.jpg";
        //set manual object value. this will come from estimation or order
        //var detailObj = { Remarks: 'English → English native check paper · academic · research and development Expert 24 hour course', AmountOfMoney: '17,888' };
        var detailObj = {
            Remarks: $ctrl.weborder.SourceLanguage + '→' + $ctrl.weborder.TargetLanguage + ' ' + $ctrl.weborder.TranslationTypeName + ' ', AmountOfMoney: $ctrl.weborder.EstimatedPrice, ConsumptionTax: $ctrl.weborder.ConsumptionTax
        };
        $ctrl.details.push(detailObj);
        $ctrl.TotalEstimatedPrice = 0;
        $ctrl.TotalConsumptionTax = 0;
        for (i = 0; i < $ctrl.details.length; i++) {
            $ctrl.TotalEstimatedPrice = Math.floor($ctrl.TotalEstimatedPrice + $ctrl.details[i].AmountOfMoney);
            $ctrl.TotalConsumptionTax = $ctrl.TotalConsumptionTax + $ctrl.details[i].ConsumptionTax;
        }
        $ctrl.TotalEstimatedPrice = Math.floor(($ctrl.TotalEstimatedPrice + $ctrl.TotalConsumptionTax) - $ctrl.TotalDiscountedAmount);

        //$ctrl.obj.PostCode = '〒8158540';
        $ctrl.obj.PostCode = '8158540';
        $ctrl.obj.Address = '4-9-1 Shiobara, Minami-ku, Fukuoka city, Fukuoka prefecture';
        $ctrl.obj.ClientName = 'Kyushu University';
        $ctrl.obj.PersonInCharge = 'Ms. Reiko Kamioka';
        $ctrl.obj.Company = '株式会社ビーコス';
        $ctrl.obj.BranchCompany = '翻訳プロ事務局';
        $ctrl.obj.UserPostCode = '〒105-0013 ';
        $ctrl.obj.UserAddress = '東京都港区浜松町2-1-3 第二森ビル4F ';
        $ctrl.obj.Contact = 'TEL +81-3-5408-9540  FAX +81-3-3433-3320';
        $ctrl.obj.Email = 'E-mail: info@b-cause.co.jp';
        $ctrl.obj.DeliveryDate = $ctrl.weborder.DeliveryDate;
        $ctrl.obj.ProposalNo = '170113O001';
        $ctrl.obj.TotalPrice = '17,388';
        $ctrl.obj.PaymentDate = '2017/02/28';
        $ctrl.obj.ConsumptionTax = $ctrl.weborder.ConsumptionTax;
        $ctrl.obj.Total = $ctrl.weborder.EstimatedPrice;
        $ctrl.obj.Remarks1 = 'For payment, thank you to the following account.';
        $ctrl.obj.Remarks2 = 'Please bear the transfer fee at your expense.';
        $ctrl.obj.Remarks3 = 'When transfer name is different from invoice address, sorry to trouble you but sorry to trouble you, but thank you.';
        $ctrl.obj.AccountInfo1 = 'transfer destination: Sumitomo Mitsui Banking Corporation Hamamatsu-cho Branch 679 deposit type: Savings';
        $ctrl.obj.AccountInfo2 = 'Account Number: 7471947 Account Holder: Corporation Bikosu';
    };
    $ctrl.Close = function () {
        $ctrl.modalInstance.close($ctrl.modalData);
    };

    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };

}

