

angular.module("hiworkApp").component("worklisttransbusiness", {
    templateUrl: "App/Components/WorkList/Template/workListTranslationBusiness.html",
    controllerAs: "vm",
    controller: workListController
});
workListController.$inject = ['$scope', 'appSettings', 'AppStorage', 'sessionFactory', 'ajaxService', '$state', "EstimationType", "$filter"];


function workListController($scope, appSettings, AppStorage, sessionFactory, ajaxService, $state, EstimationType, $filter) {

    var vm = this;
    var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
    var currentUser = sessionFactory.GetObject(AppStorage.userData);

    $scope.gridOptions = {
        excludeProperties: '__metadata',
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        enableSorting: true,
        enableFiltering: true,
        enableGridMenu: true,
        saveFocus: false,
        saveScroll: true,
        rowBorderTop: '1px solid lightgrey',
        enableSelectAll: true,
        enablePaging: true,
        paginationPageSizes: [10, 25, 50, 100],
        paginationPageSize: 100,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        //rowHeight: 80,
        //showGridFooter: true,
        columnDefs:
            [
                { field: 'ItemIndex', width: '1%', displayName: $filter('translator')('NO'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center"> {{COL_FIELD}}</div>' },
                { field: 'EstimationNo', width: '4%', displayName: $filter('translator')('ESTIMATIONNO'), headerCellClass: 'text-center', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()" style="text-align:center"><a ng-class="col.colIndex()"><a href="" ng-click="grid.appScope.defineRoute(row.entity)">{{COL_FIELD}}</a></div>' },
                //{ field: 'InquiryDate', width: '4%', displayName: $filter('translator')('CONTACTDATE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center" title="{{COL_FIELD | date:\'dd/MM/yyyy\' }}">{{COL_FIELD | date:"dd/MM/yyyy"  }}</div>' },
                { field: 'EstimationTypeName',width: '5%', displayName: $filter('translator')('ESTIMATIONTYPE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left" class="paddingLeft8 elementNew"> {{COL_FIELD}}</div>' },
                { field: 'SalesPersonName', width: '5%', displayName: $filter('translator')('SALEREPRESENTATIVE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left" class="paddingLeft8 elementNew"> {{COL_FIELD}}</div>' },
                { field: 'Response', displayName: $filter('translator')('RESPONSE') },
                { field: 'Order', displayName: $filter('translator')('ORDER'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left"> {{COL_FIELD}}</div>' },
                { field: 'File', displayName: $filter('translator')('FILE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center"> {{COL_FIELD}}</div>' },
                //{ field: 'Condition', displayName: $filter('translator')('CONDITION') },
                 //{ field: 'BusinessName', displayName: $filter('translator')('BUSINESSNAME') },
                { field: 'ClientPersonInCharge', displayName: $filter('translator')('PERSONINCHARGE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left" class="paddingLeft8 elementNew"> {{COL_FIELD}}</div>' },
                //{ field: 'TaskName', displayName: $filter('translator')('TASKNAME') },
                { field: 'NoOfPages', displayName: $filter('translator')('NUMBEROFPAGES'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:right"> {{COL_FIELD}}</div>' },
                 //{ field: 'Evaluation', displayName: $filter('translator')('EVALUATION') },
                { field: 'QuotationInclTax', displayName: $filter('translator')('QUOTEDPRICE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:right"> {{COL_FIELD}}</div>' },
                { field: 'EstimateRouteName', displayName: $filter('translator')('ROUTE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left" class="paddingLeft8 elementNew"> {{COL_FIELD}}</div>' },
                //{ field: 'Trigger', displayName: $filter('translator')('TRIGGER') },
                //{ field: 'Time', displayName: $filter('translator')('TIME') },
                //{ field: 'BusinessCategory', displayName: $filter('translator')('BUSINESSCATEGORY') },
                { field: 'Branch', displayName: $filter('translator')('BRANCH'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left"> {{COL_FIELD}}</div>' },
                { field: 'OrderDate', width: '6%', displayName: $filter('translator')('ORDERDATETIME'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center" title="{{COL_FIELD | date:\'dd/MM/yyyy\' }}">{{COL_FIELD | date:"dd/MM/yyyy"  }}</div>' },
                { field: 'ResponseDate', width: '6%', displayName: $filter('translator')('RESPONSEDATE'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center" title="{{COL_FIELD | date:\'dd/MM/yyyy\' }}">{{COL_FIELD | date:"dd/MM/yyyy"  }}</div>' },
                //{ field: 'EstimationStatusName', displayName: $filter('translator')('STATUS') },
                { field: 'ConfirmationTime', width: '6%', displayName: $filter('translator')('CONFIRMATIONTIME'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:center" title="{{COL_FIELD | date:\'dd/MM/yyyy\' }}">{{COL_FIELD | date:"dd/MM/yyyy"  }}</div>' },
                { field: 'ConfirmatingPerson', displayName: $filter('translator')('CONFIRMINGPERSON'), headerCellClass: 'text-center', cellTemplate: '<div style="text-align:left elementNew"> {{COL_FIELD}}</div>' }
            ]
    };

    $scope.defineRoute = function (Entity) {
        var route;
        switch (Entity.EstimationType) {
            case EstimationType.Translation:
                route = "TranslationEstimation";
                break;
            case EstimationType.Project:
                route = "TaskQuotationInput";
                break;
            case EstimationType.DTP:
                route = "DTPEstimation";
                break;
            case EstimationType.ShortTermDispatch:
                route = "ShortTermEstimation";
                break;
            case EstimationType.Transcription:
                route = "TranscriptionEstimation";
                break;
            case EstimationType.OverheadCost:
                route = "OverheadCostQuotation";
                break;
            case EstimationType.Interpreter:
                route = "EstimationInterpretationQuotation";
                break;
            case EstimationType.Narration:
                route = "NarrationEstimation";
                break;
        }

        $state.go(route, { "id": Entity.ID, "Estimation": Entity });
    };


    vm.$onInit = function () {
        var BaseModel = {};
        BaseModel.CurrentUserID = currentUser.CurrentUserID;
        BaseModel.CurrentCulture = currentCulture;
        BaseModel.ApplicationId = appSettings.ApplicationId;
        ajaxService.AjaxPostWithData(BaseModel, "worktranslationbusiness/list", onGetData, onErrorToastMessage);
    };

    var onGetData = function (response) {
        debugger;
        for (var i = 0; i < response.length; i++) {
            response[i].ItemIndex = null;
            response[i].ItemIndex = i + 1;
        }
        $scope.gridOptions.data = response;
    };

    $scope.edit = function (ID) {
        console.log(ID)
    };
}
