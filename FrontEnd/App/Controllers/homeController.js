angular.module("hiworkApp").controller("homeController", function($window, $scope, $state, $rootScope, appMenu, sessionFactory, AppStorage, UserType, translatorService, currentUserToken, ajaxService, appSettings, $http, EstimationType, $localStorage, i18nService) {

    //SELECT dbo.[Order].OrderNo, dbo.Estimation.EstimationType, dbo.[Master.EstimationType].Code, dbo.[Master.EstimationType].Name_en, dbo.Estimation.EstimationNo, dbo.[Order].ID, dbo.[Order].RegistrationID, 
    //dbo.[Order].ApplicationID, dbo.[Order].EstimationID
    //FROM dbo.[Order] INNER JOIN
    //dbo.Estimation ON dbo.[Order].EstimationID = dbo.Estimation.ID INNER JOIN
    //dbo.[Master.EstimationType] ON dbo.Estimation.EstimationType = dbo.[Master.EstimationType].ID
    $localStorage.TranslationEstimation = null;
   
    var Model = {};
    var type;
    var searchValue;
    Model.Search = {};
    var BaseModel = {};
    var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
    var currentUser = sessionFactory.GetObject(AppStorage.userData);
    if (currentUser == undefined) {
        $state.go('login', {});
        return;
    }

    BaseModel.CurrentUserID = currentUser.CurrentUserID;
    BaseModel.CurrentCulture = currentCulture;
    BaseModel.ApplicationId = appSettings.ApplicationId;
    $scope.applicationVersion = appSettings.APPLICATION_VERSION;
    var callback = function(response) {
        var userData = JSON.parse(sessionFactory.GetData(AppStorage.userData));
        $scope.RoleName = response.Role.Name;
        $scope.TeamName = response.Team;
        $scope.BranchName = response.Branch;
        userData.Branch = response.Branch;
        userData.Team = response.Team;
        sessionFactory.SetObject(AppStorage.userData, userData);
    };
    ajaxService.AjaxPostWithData(BaseModel, 'user/getuserinformation', callback, onErrorToastMessage);
    Model.CurrentUserID = currentUser.CurrentUserID;
    Model.CurrentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
    Model.ApplicationId = appSettings.ApplicationId;




    $scope.orderKeyUp = function(e) {
        if (e.keyCode == '13') {
            $scope.search(orderId.value, 'order');
        }
    };
    $scope.staffKeyUp = function(e) {
        if (e.keyCode == '13') {
            $scope.search(staffId.value, 'staff');
        }
    };
    $scope.clientKeyUp = function(e) {
        if (e.keyCode == '13') {
            $scope.search(clientId.value, 'client');
        }
    };
    $scope.search = function (value, field) {
        debugger;
        searchValue = value;
        type = field;
        Model.Search.Value = value;
        Model.Search.Type = field;
        if (field == 'order') {
            ajaxService.AjaxPostWithData(Model, "homeapi/searchorder", successOrderFunction, errorFunction);
        } else if (field == 'staff') {
            ajaxService.AjaxPostWithData(Model, "homeapi/searchstaff", successStaffFunction, errorFunction);
        } else if (field == 'client') {
            ajaxService.AjaxPostWithData(Model, "homeapi/searchclient", successClientFunction, errorFunction);
        }
    };

    var successOrderFunction = function(response) {
        if (response.length > 0) {
            let route;
            let routeParam={ "id": response[0].ID, "estimationNo": response[0].EstimationNo, "Estimation": response[0] };

            debugger;
            if (response[0].EstimationStatus > 4 && response[0].EstimationStatus < 14)
                response[0].TypeCode = 'TOD';
            switch (response[0].EstimationType) {
                case 1:
                    //route = "TranslationOrderDetails";
                    route = "TranslationEstimation";
                    break;
                case 4:
                    route = "ShortTermEstimation";
                    break;
                case 5:
                    route = "TaskQuotationInput";
                    break;
                case 'TOD':
                    route = "TranslationOrderDetails";
                    break;
                case 6:
                    route = "DTPEstimation";
                    break;
                case 7:
                    route = "NarrationEstimation"; //NarrationEstimation
                    break;
                case 'ST':
                    route = "OrderDetails";
                    break;
                case 'TC':
                    route = "TranscriptionOrderDetails";
                    break;
                case 'OC':
                    route = "OverheadCostQuotation";
                    break;
                case 9:
                    route = "TranscriptionEstimation";
                    break;
                case 2:
                    route = "EstimationInterpretationQuotation";
                    break;
                case 13:
                    route = "DispatchIntroduction";
                    break;
                case 1005:
                    route = "DispatchIntroduction";
                    break;
                case 1006:
                    route = "InternationalExchangeQuotation";
                    break;
                case 1009:
                    route = "HrProjectEstimation";
                    break;
                case 1010:
                    route = "DispatchIntroduction";
                    break;
                case 12:
                    route = "WebOrderModule";
                    routeParam = { "id": response[0].EstimationNo + '&' + 4, "OrderInformation": response[0] };
                    break;
                case 14:
                    route = "editingproOrderDetails";
                    routeParam = { "estimationNo": response[0].EstimationNo }
                    break;
            }

            $localStorage.TranslationEstimation = response[0];
            $state.goNewTab(route, routeParam);
            //$state.goNewTab(route, { "id": response[0].ID, "estimationNo": response[0].EstimationNo, "Estimation": response[0] });
        } else {
            onErrorToastMessage("Order Number Not Found.");
        }
    };
    var successStaffFunction = function(response) {
        if (response.length > 0) {
            //$state.go("StaffRegistration", { "ID": response[0].Id });
            $state.goNewTab("StaffRegistration.details", { "staffNo": response[0].Id });
        } else {
            onErrorToastMessage("Staff Number Not Found.");
        }
    };
    var successClientFunction = function(response) {
        if (response.length > 0) {
            var route;
            route = "CompanyRegistrationParent";
            route = "CompanyRegistrationParent.companyBasicInfo";

            $state.goNewTab(route, {
                "ID": null,
                "no": response[0].RegistrationID,
                "Company": null
            });
            //$state.go("CompanyRegistrationParent", { "no": 1000010540 });
            //{ "ID": response[0].Id }
        } else {
            onErrorToastMessage("Client Number Not Found.");
        }
    };
    var errorFunction = function(response) {
        onErrorToastMessage("System Error. Please Contact Administrator.");
    };

    if (currentUserToken.profile.token === "" ||
        currentUserToken.profile.token === 'undefined') {
        $state.go("login");
        return;
    };

    $scope.selectedMenu = appMenu.Dashboard;
    $scope.UserType = UserType;
    $scope.mobileMenuActive = false;
    $scope.currentUser = sessionFactory.GetObject(AppStorage.userData);
    $scope.languages = sessionFactory.GetSessionObject(AppStorage.cultureData);
    $scope.appMenu = appMenu;
    $scope.setMenu = function(menu) {
        $scope.selectedMenu = menu;
    };
    $scope.logout = function() {
        sessionFactory.ClearAll();
        currentUserToken.profile.username = "";
        currentUserToken.profile.token = "";
        currentUserToken.remove();
        $state.go("login");
    };


    //start
    $scope.changePassword = function () {

        ajaxService.AjaxPostWithData($scope.currentUser, 'user/getuserinformation', function (response) {
            $scope.go(response);
        }, onErrorToastMessage);

    };
    //end

    $scope.go = function(User) {
        // console.log(User);
        $state.go("UserChangePassword", { "ID": User.Id, "Username": User.Username, "CultureID": currentCulture });
    };


    $scope.languageChanged = function(selectLanguage) {
        i18nService.setCurrentLang('zh-cn');
        translatorService.setCurrentLanguage(selectLanguage.Code);
    };


    $scope.loadNotifications = function() {
        $http({ method: 'POST', url: appSettings.API_BASE_URL + 'notification/list', data: BaseModel }).then(
            function(r) {
                $scope.notifications = r.data;
                $scope.unreadcount = $scope.notifications.length;
            },
            function(error) {

            });
    };

    $scope.traceOutNotification = function($event, item) {
        $event.stopPropagation();

        ajaxService.AjaxPostWithData(BaseModel,
            'estimation/getspecificestimation/' + item.EstimationNo,
            function(r) {
                if (r) {
                    $scope.loadNotifications();

                    var route;
                    switch (r.EstimationType) {
                    case EstimationType.Translation:
                        route = 'TranslationEstimation';
                        break;
                    case EstimationType.Project:
                        route = 'TaskQuotationInput';
                        break;
                    case EstimationType.DTP:
                        route = 'DTPEstimation';
                        break;
                    case EstimationType.ShortTermDispatch:
                        route = 'ShortTermEstimation';
                        break;
                    case EstimationType.Transcription:
                        route = 'TranscriptionEstimation';
                        break;
                    case EstimationType.OverheadCost:
                        route = 'OverheadCostQuotation';
                        break;
                    }

                    $state.goNewTab(route, { "id": r.ID, "estimationNo": r.EstimationNo, "Estimation": r });
                }
            },
            function() {});
    };

    $scope.approvalEstimations = function() {
        $state.go(route, { "id": r.ID, "Estimation": r });
    };

    var countUnreadNotification = function() {
        $http({ method: 'POST', url: appSettings.API_BASE_URL + 'notification/unreadcount', data: BaseModel }).then(
            function(r) {
                if (r.data === 0) {
                    r.data = null;
                }
                $scope.unreadcount = r.data;
            },
            function(error) {});
    };

    var countUnapprovedNotification = function() {
        $http({ method: 'POST', url: appSettings.API_BASE_URL + 'notification/unapprovedcount', data: BaseModel }).then(
            function(r) {
                $scope.unapprovedcount = r.data;
            },
            function(error) {});
    };

    countUnapprovedNotification();
    countUnreadNotification();
});