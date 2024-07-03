angular.module('hiworkApp').component('webOrderEstimationTemplateWindowkr', {
    templateUrl: 'app/Components/WebOrderPDFTemplate/estimationTemplate_kr.html',
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
        $ctrl.CurrentDate = new Date();
        var date = new Date();

        $ctrl.CurrentDate = date.toLocaleDateString('ko-KR', options);
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
        $ctrl.obj.PersonInCharge = '';
        $ctrl.obj.Company = '주식회사비코스';
        $ctrl.obj.BranchCompany = '번역프로(trans-pro) 사무소';
        $ctrl.obj.UserPostCode = '〒105-0013';
        $ctrl.obj.UserAddress = '도쿄도 미나토구 하마마쓰초2-1-3  제2모리빌딩4F';
        $ctrl.obj.Contact = 'TEL +81-3-5408-9540 FAX +81-3-3433-3320';
        $ctrl.obj.Email = 'info@trans-pro.net';
        $ctrl.obj.DeliveryDate = $ctrl.weborder.DeliveryDate;
        $ctrl.obj.ProposalNo = '170113O001';
        $ctrl.obj.TotalPrice = '17,388';
        $ctrl.obj.PaymentDate = '2017/02/28';
        $ctrl.obj.ConsumptionTax = $ctrl.weborder.ConsumptionTax;
        $ctrl.obj.Total = $ctrl.weborder.EstimatedPrice;
        // $ctrl.obj.Remarks1 = '상기 견적은 2018년 8월까지 유효합니다.';
        $ctrl.obj.Remarks1 = ' ';
        $ctrl.obj.Remarks2 = '';
        $ctrl.obj.Remarks3 = '';
        $ctrl.obj.AccountInfo1 = 'transfer destination: Sumitomo Mitsui Banking Corporation Hamamatsu-cho Branch 679 deposit type: Savings';
        $ctrl.obj.AccountInfo2 = 'Account Number: 7471947 Account Holder: Corporation Bikosu';
        $ctrl.obj.Conclusion1 = 'We are supporting International Business and Multicultural Communication';
        $ctrl.obj.Conclusion2 = '비코스코리아는 해외 거주 외국인의 네크워크를 활용하여 해외 사업 및 국제 교류를 지원하겠습니다.';
        $ctrl.obj.Conclusion3 = '네이티브 번역가에 의한 클라우드형 온라인 번역프로(trans-pro), 15개 언어 24,677명의 번역가 대응';
        $ctrl.obj.Greetings1 = '금번에 본 사의 서비스를 이용해 주셔서 감사합니다.';
        $ctrl.obj.Greetings2 = '요청하신 문의에 대한 견적을 아래와 같이 드립니다.';
        $ctrl.obj.Greetings3 = '다음 번에도 본사의 서비스를 이용해주시기 바랍니다.';

    };
    $ctrl.Close = function () {
        $ctrl.modalInstance.close($ctrl.modalData);
    };

    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };

}

