(function () {

    //"use strict"

    var app = angular.module("hiworkApp").controller('userInfoController', userInfoController);

    app.service('RowEditor', RowEditor);
    app.controller("editUserController", editUserController);

    editUserController.$inject = ['$uibModalInstance', 'UserInfoService', 'grid', 'row', '$filter'];
    userInfoController.$inject = ['translatorService', 'RowEditor', '$uibModal', 'uiGridConstants', '$filter', '$scope', 'alerting', 'ajaxService', 'sessionFactory', 'AppStorage'];
    RowEditor.$inject = ['$rootScope', '$uibModal'];

    app.component('userInformation', {
        
        templateUrl: 'App/Components/UserInfo/Templates/UserInfo.html',
        bindings: {
            data: '=',
            roles: '=',
            userTypes: '='
        },
        controllerAs: "vm",
        controller: userInfoController

    });

    app.directive('usernameAvailable', function ($timeout, $q, UserInfoService) {
        debugger;
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, elm, attr, model) {
                model.$asyncValidators.usernameExists = function () {

                    //here you should access the backend, to check if username exists
                    //and return a promise
                    //here we're using $q and $timeout to mimic a backend call 
                    //that will resolve after 1 sec

                    var deferred = $q.defer();

                    scope.vm.entity.Username = model.$viewValue;

                    UserInfoService.checkUser(scope.vm.entity).then(function (response) {
                        console.log("resPonse::)) " + response);

                        $timeout(function () {
                            if (scope.vm.entity.Mode === 'edit') {

                                scope.vm.entity.isDisabled = true;
                                model.$setValidity('usernameExists', true);
                                return;
                            }

                            if (response.toUpperCase() === model.$viewValue.toUpperCase()) {
                                model.$setValidity('usernameExists', false);
                                //deferred.reject();
                            } else {
                                deferred.resolve();
                            }
                        }, 1000);
                    }, function (error) {
                        console.log("statusText ::))" + error.statusText);
                        console.log("data ::)) " + error.data);
                        console.log("status  ::))" + error.status);
                        console.log("headers  ::))" + error.headers);
                        console.log("error  ::))" + error);
                    });

                    return deferred.promise;
                };
            }
        }
    });

    function RowEditor($rootScope, $uibModal) {
        var service = {};
        service.editRow = editRow;

        function editRow(grid, row, vm) {
            $uibModal.open({
                //component: 'userInfoEdit',
                templateUrl: "App/Components/UserInfo/Templates/UserInfoEdit.html",
                controller: ['$uibModalInstance', 'UserInfoService', 'grid', 'row', '$filter', '$scope', '$state', '$rootScope', editUserController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () { return grid; },
                    row: function () { return row; }
                }
            });
        };

        return service;
    }

    function editUserController($uibModalInstance, UserInfoService, grid, row, $filter, $scope, $state, $rootScope) {
        var vm = this;
        vm.save = save;
        vm.entity = angular.copy(row.entity);    
        if (vm.entity.Username !== '') {
            vm.entity.Mode = 'edit';
            vm.entity.isDisabled = false;
            vm.entity.isDisabledPassword = true;
            //$scope.userForm.password.$invalid = false;
        }
        vm.entity.IsActive = vm.entity.IsActive === "Active" ? true : false;
        if (vm.entity.Role != '' && vm.entity.UserType !== '') {

            var selectedRole = $filter("filter")(vm.entity.roles, { Name: vm.entity.Role }, true);
            var selectedUserType = $filter("filter")(vm.entity.userTypes, { Name: vm.entity.UserType }, true);

            vm.entity.roles.selected = selectedRole[0];
            vm.entity.userTypes.selected = selectedUserType[0];
        }

        vm.cancel = function cancel() {
            $uibModalInstance.dismiss();
        };

        function save() {
            //if (!$scope.userForm.$invalid) {
            if (row.entity.Id === '0') {
                vm.entity.mode = '';
                vm.entity.RoleId = vm.entity.roles.selected.Id;
                vm.entity.UserTypeId = vm.entity.userTypes.selected.ID;
                vm.entity.Role = vm.entity.roles.selected.Name;
                vm.entity.IsSuperAdmin = vm.entity.userTypes.selected.Name == 'SuperAdmin' ? true : false;
                UserInfoService.addUser(vm.entity).then(function (response) {
                    var key, max = -Infinity;
                    response.forEach(function (v, k) {
                        if (max < +v.Id) {
                            max = +v.Id;
                            key = k;
                        }
                    });
                    row.entity = angular.extend(row.entity, vm.entity);
                    row.entity.Id = response[key].Id;
                    row.entity.Role = vm.entity.roles.selected.Name;
                    //row.entity.IsActive = vm.entity.IsActive ? "Active" : "InActive";
                    row.entity.IsActive = vm.entity.IsActive === true ? "Active" : "InActive";
                    row.entity.UserType = vm.entity.userTypes.selected.Name;
                    grid.data.unshift(row.entity);
                    toastr.success($filter('translator')('DATASAVED'));
                    //$rootScope.$broadcast('UserInfoSaveSuccessfully', response);
                }, function () {
                    toastr.error($filter('translator')('ERRORDBOPERATION'));
                });

            }
            else {
                vm.entity.RoleId = vm.entity.roles.selected.Id;
                vm.entity.UserTypeId = vm.entity.userTypes.selected.ID;
                vm.entity.IsSuperAdmin = vm.entity.userTypes.selected.Name == 'SuperAdmin' ? true : false;
                //vm.entity.IsActive = vm.entity.IsActive == "Active" ? true : false;
                vm.entity.IsActive === true ? "Active" : "InActive";
                UserInfoService.addUser(vm.entity).then(function (response) {               
                    row.entity = angular.extend(row.entity, vm.entity);
                    row.entity.Role = vm.entity.roles.selected.Name;
                    row.entity.IsActive = vm.entity.IsActive === true ? "Active" : "InActive";
                    row.entity.UserType = vm.entity.userTypes.selected.Name;
                    toastr.success($filter('translator')('DATASAVED'));
                    //$rootScope.$broadcast('UserInfoSaveSuccessfully', response);
                }, function () {
                    toastr.error($filter('translator')('ERRORDBOPERATION'));
                });

            }

            $uibModalInstance.close(row.entity);
            //}
        }
    }

    function userInfoController(translatorService, RowEditor, $uibModal, uiGridConstants, $filter, $scope, alerting, ajaxService, sessionFactory, AppStorage) {

        var vm = this;
        vm.tmk = [];
        vm.condition = {};
        vm.condition =
            {
                branch: '',
                type: '',
                eid: '',
                resign: '',
                role: '',
                author: '',
                ename: ''
            };

        vm.SearchUser = function () {
            vm.tmk[0] = vm.condition.branch;
            vm.tmk[1] = vm.condition.type;
            vm.tmk[2] = vm.condition.eid;
            vm.tmk[3] = vm.condition.resign;
            vm.tmk[4] = vm.condition.role;
            vm.tmk[5] = vm.condition.author;
            vm.tmk[6] = vm.condition.ename;
            var BaseModel = {};
            BaseModel.CurrentUserID = currentUser.CurrentUserID;
            BaseModel.CurrentCulture = currentCulture;
            BaseModel.ApplicationId = appSettings.ApplicationId;
            ajaxService.AjaxPostWithData(BaseModel, "userInfo/conlist/" + vm.tmk, onGetDataEmployee, onGetError);
        };
        var onGetDataEmployee = function (response) {           
            vm.gridOptions.data = [];
            vm.gridOptions.data = response;
            vm.gridOptions.totalItems = response.length;
        };
        vm.editRow = RowEditor.editRow;
        vm.ConfirmationAlert = ConfirmationAlert;
        vm.AddNewUser = AddNewUser;
        vm.baseModel = {};
        var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
        var currentUser = sessionFactory.GetObject(AppStorage.userData);
        vm.baseModel.CurrentUserID = currentUser.CurrentUserID;
        vm.baseModel.CurrentCulture = currentCulture;

        var rolesBind = '';
        var userTypeBind = '';

        this.$onInit = function () {
            console.log("vm.data:::" + JSON.stringify(vm.data));
            for (var i = 0; i < vm.data.length; i++) {
                vm.data[i].ItemIndex = null;
                vm.data[i].ItemIndex = i + 1;
            }
            vm.loadData = loadGridData(vm.data, vm.roles, vm.userTypes);

        };

        $scope.$on('$viewContentLoaded', function () {
            //Here your view    content is fully loaded !!
            var formEl1 = angular.element(document.querySelector('#uiGridUserCtrl'));
            formEl1.removeAttr('style');
        });
        $scope.$on("UserInfoSaveSuccessfully", function (event, response) {
            debugger;
            vm.loadData = loadGridData(vm.data, vm.roles, vm.userTypes);
        });
        //vm.getTableHeight = function () {
        //    var rowHeight = 0; // your row height
        //    var headerHeight = 0; // your header height
        //    return {
        //        height: (vm.gridOptions.data.length * rowHeight + headerHeight) + "px"
        //    };
        //};


        function loadGridData(userData, roles, userTypes) {

            //userData.roles = roles;
            //userData.userTypes = userTypes;

            rolesBind = roles;
            userTypeBind = userTypes;
            //var finalData = [];

            if (currentUser.IsSuperAdmin === "False") {
                angular.forEach(userData, function (value, key) {
                    if (value.Id == vm.baseModel.CurrentUserID) {
                        userData = [];
                        userData.push(value);
                    }
                })
            }

            for (var key in userData) {
                if (!userData.hasOwnProperty(key)) continue;

                //if (userData[key] != null && userData[key] != '') continue;
                if (key == 'roles' || key == 'userTypes') continue;

                userData[key].roles = roles;
                userData[key].userTypes = userTypes;

                var selectedUserType = $filter("filter")(userData[key].userTypes, { ID: userData[key].UserTypeId }, true);

                userData[key].UserType = selectedUserType[0].Name;

                for (var role in roles) {
                    if (!roles.hasOwnProperty(role)) continue;
                    if (userData[key].RoleId == roles[role].Id) {
                        try {
                            userData[key].Role = roles[role].Name
                            userData[key].RoleId = roles[role].Id
                            //finalData.push(userData[key]);

                            if (userData[key].IsActive == true) userData[key].IsActive = 'Active';
                            else userData[key].IsActive = 'InActive';
                        }
                        catch (err) {
                            console.log("Error::" + err);
                            continue;
                        }
                    }
                }
            }
            vm.gridOptions.data = userData;
            vm.gridOptions.totalItems = userData.length;  
        }

        vm.gridOptions = {
            //data: userData,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            multiSelect: true,
            enableSorting: true,
            enableFiltering: false,
            enableGridMenu: true,
            rowHeight: '30px',
            //rowBorderTop: '1px solid lightgrey',      
            enableSelectAll: true,
            paginationCurrentPage: 1,
            paginationPageSize: 10,
            enablePaginationControls: false,  
            //paginationPageSizes: [5, 3, 2],
            //paginationPageSize: 5, //User Name

            columnDefs: [
                { field: 'ItemIndex', displayName: $filter('translator')('NO'), width: '3%', cellTemplate: '<div style="text-align:center" class="margin-top: 10px" > {{COL_FIELD}}</div>', headerCellClass: 'text-center' },
                { field: 'Username', displayName: $filter('translator')('USERNAME'),  headerCellClass: 'text-center', cellClass: 'leftAlign', exporterPdfAlign: 'left' },
                { field: 'Email', displayName: $filter('translator')('EMAIL'),  headerCellClass: 'text-center', cellClass: 'leftAlign', exporterPdfAlign: 'left' },
                { field: 'Role', displayName: $filter('translator')('ROLE'),  headerCellClass: 'text-center', cellClass: 'leftAlign', exporterPdfAlign: 'left' },
                { field: 'IsActive', displayName: $filter('translator')('STATUS'),  headerCellClass: 'text-center', cellClass: 'leftAlign', exporterPdfAlign: 'center', cellTemplate: '<div style="text-align:center"> {{COL_FIELD}}</div>' },
                { field: 'DateOfBirth', displayName: $filter('translator')('DATEOFBIRTH'), headerCellClass: 'text-center', cellClass: 'leftAlign', cellFilter: 'date:"yy/MM/dd"', exporterPdfAlign: 'center', margin: [0, 0, 500, 0], cellTemplate: '<div style="text-align:center" title="{{COL_FIELD | date:\'yy/MM/dd\' }}">{{COL_FIELD | date:"yy/MM/dd"  }}</div>' },
                {
                    name: 'Action', displayName: $filter('translator')('ACTION'),
                    //cellTemplate: '<table> <tr> <td> <div class="ui-grid-cell-contents"> <button type="button" class="btn btn-sm btn-primary" ng-click="grid.appScope.vm.editRow(grid,row)">   <span class="glyphicon glyphicon-edit"> Edit</span></button></div> </td>' + '<td><div class="ui-grid-cell-contents"> <button type="button" class="btn btn-sm btn-primary" ng-click="grid.appScope.vm.deleteRow(grid,row)">   <span class="glyphicon glyphicon-remove"> Delete</span></button></div></td></tr></table>',
                    cellTemplate: '<table> <tr> <td class="text-right"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid,row)">    <i class="glyphicon glyphicon-edit"></i>    </div> </td>' + '<td><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.ConfirmationAlert(grid,row)">   <i class="glyphicon glyphicon-remove"></i></button></div></td></tr></table>',
                   
                    headerCellClass: 'text-center',
                    cellClass: 'backgroundCell',
                    enableFiltering: false
                }
            ],
            exporterCsvFilename: 'userFile.csv',
            exporterSuppressColumns: ['Action'],
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [20, 30, 80, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red', margin: [20, 2, 0, 0] },
            exporterPdfHeader: { text: "User Information", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 25, bold: true, italics: true, exporterPdfAlign: 'center', margin: [225, 10, 0, 0] };
                docDefinition.styles.footerStyle = { fontSize: 8, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 450,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };

        function ConfirmationAlert(grid, row) {
            var model = [];
            model.grid = grid;
            model.row = row;
            var options = {
                templateUrl: "App/Components/UserInfo/Templates/ConfirmationAlert.html",
                controller: function ($uibModalInstance) {
                    this.model = model;
                    this.deleteRow = function () {
                        deleteRow(model);
                        $uibModalInstance.dismiss();
                    }
                },
                controllerAs: "vm"
            };

            $uibModal.open(options).result;
        }

        function deleteRow(model) {
            this.row = model.row;
            this.grid = model.grid;

            vm.entity = angular.copy(row.entity);
            if (row.entity.id != '0') {
                row.entity = angular.extend(row.entity, vm.entity);
                var index = grid.appScope.vm.gridOptions.data.indexOf(row.entity);
                grid.appScope.vm.gridOptions.data.splice(index, 1);
                vm.entity.IsActive = vm.entity.IsActive = "Active" ? true : false;
                ajaxService.AjaxPostWithData(vm.entity, "userInfo/delete", function (response) {
                    console.log(response);
                    alerting.addSuccess($filter('translator')('DATASAVED'));
                }, function (error) {
                    console.log(error);
                    alerting.addDanger(error);
                });
            }
        }
        vm.filter = function () {
            vm.gridOptions.data = $filter('filter')(vm.data, vm.filterValue, undefined);
        };
        function AddNewUser(user, grid, row) {
            debugger;
            var initialDataPattern = {
                "Id": "0",
                "StaffID": 0,
                "Username": "",
                "password": "",
                "Email": "",
                "Role": "",
                "IsActive": true,
                "FirstName": "",
                "LastName": "",
                "UserTypeId": "",
                "RoleId": "",
                "roles": rolesBind,
                "userTypes": userTypeBind,
                "IsPasswordChanged": true,
                "IsSuperAdmin": true
            }
            var rowTmp = {};
            rowTmp.entity = initialDataPattern;
            vm.editRow(vm.gridOptions, rowTmp);
        }
    }
}());