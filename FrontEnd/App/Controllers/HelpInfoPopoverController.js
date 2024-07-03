angular.module('hiworkApp').controller("helpInfoPopoverController", function ($scope, $timeout,$rootScope, appSettings, AppStorage, sessionFactory, $filter, ajaxService) {

    var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
    var currentUser = sessionFactory.GetObject(AppStorage.userData);
    $scope.IsDisable = false;
    $scope.txtId = 'txt_';
    let propName = "Contents_" + currentCulture;


    $scope.fitContentSize = function () {
        let txtEl = document.getElementById($scope.txtId);
        let scrollH = txtEl.scrollHeight;
        txtEl.style.height = (scrollH + 2) + 'px';
    };

    var successOnGetting = function (response) {
        $scope.HelpContent = null;
        $scope.HelpContent = response[propName];//response.Contents;
        $scope.helpData = response;
        setTimeout(function () {
            $scope.fitContentSize();
        }, 50);
        
    };

    var errorOnSaving = function (message) {
        toastr.error($filter('translator')('ERRORDBOPERATION'));
    };

    let parentScope = $scope.$parent.$parent;

    let bindContainerEvent = function () {
        let items = document.querySelectorAll('.help-btn-container');
        if (items.length > 0) {
            items[0].addEventListener('click', function (e) {
                
                document.querySelectorAll('.help-btn').forEach(item => {
                    item.click();
                });
            }, false);
        }

    };


    let counttext = function textAreaAdjust(element) {
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    };

    let ini = function () {
        var data = {};

        data.Code = parentScope.dynamicPopover.Code;
        data.SubCode = parentScope.dynamicPopover.SubCode;
        data.Title = parentScope.dynamicPopover.title;

        $scope.txtId = $scope.txtId + data.Code + data.SubCode;

        $scope.title = parentScope.dynamicPopover.title;
        $scope.modalData = data;
        $scope.helpData = {};
        $scope.IsEditable = false;
        $scope.IsDisable = true;
        $scope.IsOpen = true;
        $scope.HelpContent = '';
        var user = sessionFactory.GetObject(AppStorage.userData);
        $scope.IsEditable = (user.Role === 'Super Admin' || user.Role === 'Manager') ? true : false;

        ajaxService.AjaxPostWithData($scope.modalData, "company/Help", successOnGetting, errorOnSaving);

        //bindContainerEvent();
    }

    ini();



    $scope.Edit = function () {
        $scope.IsDisable = false;
    };
    $scope.Save = function () {
        $scope.helpData.Contents = $scope.HelpContent;
        $scope.helpData[propName] = $scope.HelpContent;
        $scope.helpData.Code = $scope.modalData.Code;
        $scope.helpData.SubCode = $scope.modalData.SubCode;
        ajaxService.AjaxPostWithData($scope.helpData, "company/SaveHelp", successOnSaving, errorOnSaving);
    };
    var successOnSaving = function (response) {
        $scope.IsDisable = true;
        toastr.success($filter('translator')('DATASAVED'));
    };



    $scope.Close = function (subcode) {
        
        let btn = document.querySelector('#help-btn-' + subcode);
        $timeout(function () {
            btn.click();
        });
           
     
    };
    
});