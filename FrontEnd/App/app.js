(function () {
    'use strict';

    var hiworkApp = angular.module("hiworkApp", [
        "ui.router",
        "ngResource",
        "ngAnimate",
        "ngSanitize",
        "ngTouch",
        "ngCookies",
        "blockUI",
        "ui.bootstrap",
        "ui.calendar",
        "smart-table",
        "ui.select",
        "ngAnimate",
        "ui.grid",
        'ui.grid.resizeColumns',
        'ui.grid.moveColumns',
        'ui.grid.selection',
        'ui.grid.edit',
        'ui.grid.exporter',
        'ui.grid.pagination',
        'ui.grid.autoResize',
        'ngRoute',
        'ngStorage',
        "tmh.dynamicLocale",
        'ui.grid.pinning',
        'hl.sticky',
        'angularjs-dropdown-multiselect'
    ]);

    hiworkApp.directive('popoverClose', function ($timeout) {
        return {
            scope: {
                excludeClass: '@'
            },
            link: function (scope, element, attrs) {
                var trigger = document.getElementsByClassName('trigger');

                function closeTrigger(i) {
                    $timeout(function () {
                        angular.element(trigger[0]).triggerHandler('click').removeClass('trigger');
                    });
                }

                element.on('click', function (event) {
                    var etarget = angular.element(event.target);
                    var tlength = trigger.length;
                    if (!etarget.hasClass('trigger') && !etarget.hasClass(scope.excludeClass)) {
                        for (var i = 0; i < tlength; i++) {
                            closeTrigger(i)
                        }
                    }
                });
            }
        };
    });
    hiworkApp.directive('popoverElem', function () {
        return {
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    element.addClass('trigger');
                });
            }
        };
    });

    hiworkApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, tmhDynamicLocaleProvider) {
        //$locationProvider.hashPrefix(''); // by default '!'
        //$locationProvider.html5Mode(true);
        tmhDynamicLocaleProvider.localeLocationPattern('scripts/i18n/angular-locale_{{locale}}.js');
        $urlRouterProvider.otherwise('/');
        $stateProvider.state("/", {
            url: "/",
            templateUrl: 'Views/UserManagement/Login.html',
            controller: "loginController"
        })
            .state("login", {
                url: "/login",
                templateUrl: 'Views/UserManagement/Login.html',
                controller: "loginController"
            })
            .state("home", {
                //url: "/home",
                url: "",
                templateUrl: 'Views/home.html',
                controller: "homeController"
            })


            //.state("centralRegistration",
            //{
            //    url: "/centralRegistration",
            //    templateUrl: 'Views/CentralRegistration/StaffCentralRegistration.html',
            //    controller: "centralRegistrationController"
            //})
            .state("centralRegistration", {
                url: "/centralRegistration",
                templateUrl: 'App/Components/StaffRegistrationCentral/Templates/StaffRegistrationParent.html',
                controller: "staffExtRegistrationParentController"
            })
            .state("centralRegistration.staffRegistrationParam", {
                parent: "centralRegistration",
                url: "/referredby::id",
                params: { params: null },
                template: '<staff-ext-registration country-Data="$resolve.countryData" staffservicetypelist="$resolve.staffservicetypelist"></staff-ext-registration>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    staffservicetypelist: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffServiceType();
                    }]
                }
            })
            .state("centralRegistration.staffRegistration", {
                parent: "centralRegistration",
                url: "/basic",
                params: { params: null },
                template: '<staff-ext-registration country-Data="$resolve.countryData" staffservicetypelist="$resolve.staffservicetypelist"></staff-ext-registration>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    staffservicetypelist: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffServiceType();
                    }]
                }
            })
            .state("centralRegistration.staffExtRegistrationDetails", {
                parent: "centralRegistration",
                url: "/details",
                template: '<staffextregistrationdetails country-data="$resolve.countryData" staff-Languagefl3="$resolve.staffLanguagefl3" staff-Languagefl2="$resolve.staffLanguagefl2" staff-Languagefl1="$resolve.staffLanguagefl1" staff-Visa-Type-Data="$resolve.staffVisaTypeData" language-Lvl="$resolve.getLanguageLvl" specialized-fields="$resolve.specializedFields"></staffextregistrationdetails>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    staffLanguageData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguage();
                    }],
                    staffLanguagefl1: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl2: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl3: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffVisaTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffVisaType();
                    }],
                    getLanguageLvl: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguageLvl();
                    }]
                    //specializedFields: ['estimationService', function (estimationService) {
                    //    return estimationService.getSpecializedField();
                    //}]
                }
            })
            .state("centralRegistration.staffExtEducationalInfo", {
                parent: "centralRegistration",
                url: "/educationalInformation",
                template: '<staffexteducationalinfo  countries="$resolve.countries" educationaldegree="$resolve.educationaldegree" mejorsubject="$resolve.mejorsubject" majorsubject-details="$resolve.majorsubjectDetails"></staffexteducationalinfo>',
                resolve: {
                    countries: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry(null);
                    }],
                    educationaldegree: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getEducationaldegree(null);
                    }],

                    mejorsubject: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getMejorSubject();
                    }],

                    majorsubjectDetails: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getMajorSubjectDetails();
                    }]
                }
            })
            .state("centralRegistration.staffExtSkillAndCertificate", {
                parent: "centralRegistration",
                url: "/SkillAndCertificate",
                template: '<staffextskillandcertificate></staffextskillandcertificate>'
            })
            .state("centralRegistration.staffExtJobHistory", {
                parent: "centralRegistration",
                url: "/JobHistory",
                template: '<staffextjobhistorycomponent description="$resolve.Description" name="$resolve.Name" -staff-employment-type="$resolve.EmpTypeList" -staff-business-category="$resolve.BCategory" -staff-business-category-details="$resolve.BCategoryDetail" -staff-salary-type="$resolve.SalaryType" -staff-resignation-reason="$resolve.ResignationReason" currencylist="$resolve.CurrencyList"></staffextjobhistorycomponent>',
                resolve: {
                    Description: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategoryDetail(null);
                    }],
                    Name: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategory(null);
                    }],
                    EmpTypeList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffEmploymentType();
                    }],
                    BCategory: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategory();
                    }],
                    BCategoryDetail: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategoryDetail();
                    }],
                    SalaryType: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getSalaryType();
                    }],
                    ResignationReason: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getResignationreason();
                    }],
                    CurrencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrencyList();
                    }]
                }
            })
            .state("centralRegistration.staffExtTranspro", {
                parent: "centralRegistration",
                url: "/Transpro",
                template: '<staffexttransprocomponent special-skills-details = $resolve.specialSkillsDetails special-skills =$resolve.specialSkills research-skills =$resolve.researchSkills patent-skills =$resolve.patentSkills></staffexttransprocomponent>',
                resolve: {
                    specialSkillsDetails: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getSpecialSkillsDetails();
                    }],
                    specialSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getSpecialSkills();
                    }],
                    researchSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getResearchSkills();
                    }],
                    patentSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getPatentSkills();
                    }]
                }
            })
            .state("centralRegistration.staffExtBankAndPayment", {
                parent: "centralRegistration",
                url: "/BankInformation",
                template: '<staffextbankandpayment country-Data="$resolve.countryData" bank-Data="$resolve.bankData" bank-Account-Type-Data="$resolve.bankAccountTypeData" staff-Bank-Branch-Data= "$resolve.staffBankBranchData"></staffextbankandpayment>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    bankAccountTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBankAccountType();
                    }],
                    bankData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBank();
                    }],
                    staffBankBranchData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBankBranches();
                    }]
                }
            })

            .state("centralRegistration.StaffExtHRDeatils", {
                parent: "centralRegistration",
                url: "/hrdetails",
                template: '<staffhrdetails countries="$resolve.countries" scout="$resolve.scout" hrrecieveoffer="$resolve.hrrecieveoffer" jobcategory="$resolve.jobcategory"></staffhrdetails>',
                resolve: {
                    countries: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    scout: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffScoutList();
                    }],
                    hrrecieveoffer: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffHrOfferList();
                    }],
                    jobcategory: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategory();
                    }]
                }

            })
            .state("centralRegistration.hrbasic", {
                parent: "centralRegistration",
                url: "/hrbasic",
                template: '<staffextbasichrinfo  -staff-salary-type="$resolve.SalaryType"  file-Category = "$resolve.fileCategory"></staffextbasichrinfo>',
                resolve: {
                    //countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                    //    return StaffRegistrationService.getCountry();
                    //}],
                    SalaryType: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getSalaryType();
                    }],
                    fileCategory: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getFileCategory();
                    }],
                    //currencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                    //    return StaffRegistrationService.getallCurrency();
                    // }]

                }

            })

            .state("centralRegistration.narration", {
                parent: "centralRegistration",
                url: "/narration",
                template: '<staffextnarration staff-profession="$resolve.staffProfession" staff-voicetype="$resolve.staffNarrationVoiceType" staff-ageimpression="$resolve.staffNarrationAgeImpression" staff-senseorpurpose="$resolve.staffNarrationSenseOrPurpose" currencylist="$resolve.CurrencyList"></staffextnarration>',
                resolve: {
                    staffProfession: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffProfession();
                    }],
                    staffNarrationVoiceType: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationVoiceType();
                    }],
                    staffNarrationAgeImpression: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationAgeImpression();
                    }],
                    staffNarrationSenseOrPurpose: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationSenseOrPurpose();
                    }],
                    CurrencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrencyList();
                    }]
                }

            })
            .state("dashboard", {
                parent: "home",
                url: '/dashboard',
                template: '<dashboard currency-list="$resolve.currencyList"></dashboard>',
                resolve: {
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("hrdashboard", {
                parent: "home",
                url: "/hrdashboard",
                template: "<hrdashboard></hrdashboard>",
                resolve: {}
            })
            .state("accountsdashboard", {
                parent: "home",
                url: "/accountsdashboard",
                template: "<accountsdashboard></accountsdashboard>",
                resolve: {}
            })
            .state("translatordashboard", {
                parent: "home",
                url: "/translatordashboard",
                template: "<translatordashboard></translatordashboard>",
                resolve: {}
            })
            .state("SystemSettings", {
                parent: "home",
                url: '/Settings',
                template: "<application></application>",
                resolve: {}
            })
            .state("Country", {
                parent: "home",
                url: '/Country',
                template: "<country></country>",
                resolve: {

                }
            })
            .state("UserInfo", {
                parent: "home",
                url: '/UserInfo',
                template: '<user-Information data="$resolve.data" roles="$resolve.roles" user-Types="$resolve.userTypes"></user-Information>',
                resolve: {
                    data: ['UserInfoService', function (UserInfoService) {
                        return UserInfoService.getUser();
                    }],
                    roles: ['UserInfoService', function (UserInfoService) {
                        return UserInfoService.getRoles();
                    }],
                    userTypes: ['UserInfoService', function (UserInfoService) {
                        return UserInfoService.getUserType();
                    }]
                }
            })
            .state("AdvancedStaffSearch", {
                parent: "home",
                url: '/staffAvdSearch',
                params: {MODEL: {} },
                template: '<advanced-staff-search routes="$resolve.routes" sourceofregistration="$resolve.sourceofregistration" languages="$resolve.languages" country-Data="$resolve.countryData" languagelevel="$resolve.languagelevel" age="$resolve.age" nationalitygroup="$resolve.nationalitygroup" nationality="$resolve.nationality" visatype="$resolve.visatype" visaexpire="$resolve.visaexpire" snsaccount="$resolve.snsaccount" technicalskillparent="$resolve.technicalskillparent" developmentskillparent="$resolve.developmentskillparent" knowledgeskillparent="$resolve.knowledgeskillparent" medicalskillparent="$resolve.medicalskillparent" officetype="$resolve.officetype" webtype="$resolve.webtype" translationtools="$resolve.translationtools" toolname="$resolve.toolname" design="$resolve.design" softwarename="$resolve.softwarename" narrationperformance="$resolve.narrationperformance"></advanced-staff-search>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    //services: ["estimationService", function (estimationService) {
                    //    return estimationService.estimationServices(3);
                    //}],
                    sourceofregistration: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.sourceofregistration();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    languagelevel: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.languagelevel();
                    }],
                    age: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.age();
                    }],
                    nationalitygroup: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.nationalitygroup();
                    }],
                    nationality: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.nationality();
                    }],
                    visatype: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.visatype();
                    }],
                    visaexpire: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.visaexpire();
                    }],
                    snsaccount: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.snsaccount();
                    }],
                    technicalskillparent: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.technicalskillparent();
                    }],
                    developmentskillparent: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.developmentskillparent();
                    }],
                    knowledgeskillparent: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.knowledgeskillparent();
                    }],
                    medicalskillparent: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.medicalskillparent();
                    }],
                    officetype: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.officetype();
                    }],
                    webtype: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.webtype();
                    }],
                    translationtools: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.translationtools();
                    }],
                    toolname: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.toolname();
                    }],
                    design: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.design();
                    }],
                    softwarename: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.softwarename();
                    }],
                    narrationperformance: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.narrationperformance();
                    }]
                }
            })
            .state("StaffList", {
                parent: "home",
                url: '/staffList',
                template: '<staff-list language="$resolve.language"  languagelevel="$resolve.languagelevel" countries="$resolve.country"></staff-list>',
                resolve: {
                    language: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.language();
                    }],
                    country: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.country();
                    }],
                    languagelevel: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.languagelevel();
                    }],


                }
            })
            .state("SupportedLangManagement", {
                parent: "home",
                url: '/LanguageManagement',
                params: { MODEL: null },
                template: '<supported-lang-management languages="$resolve.languages"></supported-lang-management>',
                resolve: {
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }]

                }
            })
            .state("StaffRegistration.skillCertificate", {
                parent: "StaffRegistration",
                url: "/SkillAndCertificate",
                template: '<staff-skill-and-certificate staffprojectrole="$resolve.staffprojectrole"></staff-skill-and-certificate>',
                resolve: {
                    staffprojectrole: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffMasterProjectRole(null);
                    }]
                }
            })
            //.state("StaffRegistration.bankAndPayment", {
            //　parent: "StaffRegistration",
            //　url: "/BankAndPayment",

            //　template: '<staff-bank-and-payment ></staff-bank-and-payment>',
            //　//resolve: {
            //　//　countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
            //　//　　return StaffRegistrationService.getCountry();
            //　//　}]
            //　//}

            //})
            .state("AdvancedStaffSearchList", {
                parent: "home",
                url: "/AdvancedStaffSearchList",
                params: { MODEL: {} },
                template: '<advanced-staff-search-list routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></advanced-staff-search-list>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("TranscriptionOrderDetails", {
                parent: "home",
                //url: "/TranscriptionOrderDetails/:id",
                url: "/TranscriptionOrderDetails/:estimationNo",
                params: { id: null, Estimation: null },
                template: '<transcription-order routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></transcription-order>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("NarrationEstimation", {
                parent: "home",
                url: "/NarrationEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<narration-Estimation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></narration-Estimation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("NarrationOrderDetails", {
                parent: "home",
                url: "/NarrationOrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<narration-Order routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></narration-Order>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("DTPEstimation", {
                parent: "home",
                url: "/DTPEstimation/:estimationNo",
                params: { id: null, Estimation: null },
                template: '<dtp-estimation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" page-count-type="$resolve.pageCountType " currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></dtp-estimation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    pageCountType: ["estimationService", function (estimationService) {
                        return estimationService.estimationPageCountTypes();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("TranscriptionEstimation", {
                parent: "home",
                url: "/TranscriptionEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<transcription-estimation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></transcription-estimation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(9);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("StaffRegistration", {
                parent: "home",
                //url: "StaffRegistration/{staffNo}",
                url: "/staffRegist/{staffNo}",
                template: '<staff-registration narration-Type="$resolve.narrationType" staff-Subject-Data="$resolve.staffSubjectData" staff-Degree-Data="$resolve.staffDegreeData" country-Data-Bank="$resolve.countryDataBank" staff-Languagefl3="$resolve.staffLanguagefl3"  staff-Languagefl2="$resolve.staffLanguagefl2"  staff-Languagefl1="$resolve.staffLanguagefl1" staff-Profession ="$resolve.staffProfession"  staff-Special-Field="$resolve.staffSpecialField" staff-Translation="$resolve.staffTranslation" staff-Tech-Skill-Item-Data="$resolve.staffTechSkillItemData" staff-Education-Degree-Data= "$resolve.staffEducationDegreeData" staff-Bank-Branch-Data= "$resolve.staffBankBranchData" staff-State-Data ="$resolve.staffStateData" staff-Language-Data="$resolve.staffLanguageData" staff-Employment-Type-Data="$resolve.staffEmploymentTypeData" staff-Job-Sub-Category-Data="$resolve.staffJobSubCategoryData"  staff-Job-Category-Data="$resolve.staffJobCategoryData"  staff-Business-Category-Detail-Data="$resolve.staffBusinessCategoryDetailData"  staff-Business-Category-Data="$resolve.staffBusinessCategoryData" staff-Visa-Type-Data="$resolve.staffVisaTypeData" bank-Data="$resolve.bankData" bank-Account-Type-Data="$resolve.bankAccountTypeData"  country-Data="$resolve.countryData" language-Skill-Level-Data="$resolve.languageSkillLevelData" staffservicetypelist="$resolve.staffservicetypelist"></staff-registration>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    countryDataBank: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    bankData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBank();
                    }],
                    bankAccountTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBankAccountType();
                    }],
                    staffVisaTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffVisaType();
                    }],
                    staffBusinessCategoryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategory();
                    }],
                    staffBusinessCategoryDetailData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategoryDetail();
                    }],
                    staffJobCategoryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategory();
                    }],
                    staffJobSubCategoryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategoryDetail();
                    }],
                    staffEmploymentTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffEmploymentType();
                    }],
                    staffLanguageData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguage();
                    }],
                    staffLanguagefl1: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl2: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl3: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffStateData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrentState();
                    }],
                    staffBankBranchData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBankBranches();
                    }],
                    staffEducationDegreeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getEducationDegree();
                    }],
                    staffTechSkillItemData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffTechSkillItem();
                    }],
                    staffTranslation: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffTranslation();
                    }],
                    staffSpecialField: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffSpecialField();
                    }],
                    staffProfession: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffProfession();
                    }],
                    staffDegreeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getEducationaldegree();
                    }],
                    staffSubjectData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getMejorSubject();
                    }],
                    narrationType: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationType();
                    }],
                    staffservicetypelist: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffServiceType();
                    }]



                }
            })
            .state("StaffRegistration.details", {
                parent: "StaffRegistration",
                url: "/staffDetails",
                template: '<staff-registration-details country-data="$resolve.countryData" staff-Languagefl3="$resolve.staffLanguagefl3" staff-Languagefl2="$resolve.staffLanguagefl2" staff-Languagefl1="$resolve.staffLanguagefl1" staff-Visa-Type-Data="$resolve.staffVisaTypeData" language-Lvl="$resolve.getLanguageLvl" specialized-fields="$resolve.specializedFields"></staff-registration-details>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    staffLanguageData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguage();
                    }],
                    staffLanguagefl1: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl2: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffLanguagefl3: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguagefl1();
                    }],
                    staffVisaTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffVisaType();
                    }],
                    getLanguageLvl: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguageLvl();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }]

                }
            })
            .state("StaffRegistration.jobHistory", {

                parent: "StaffRegistration",
                url: "/JobHistory",

                template: '<staff-job-history-component description="$resolve.Description" name="$resolve.Name" -staff-employment-type="$resolve.EmpTypeList" -staff-business-category="$resolve.BCategory" -staff-business-category-details="$resolve.BCategoryDetail" -staff-salary-type="$resolve.SalaryType" -staff-resignation-reason="$resolve.ResignationReason" currencylist="$resolve.CurrencyList" ></staff-job-history-component>',
                resolve: {
                    Description: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategoryDetail(null);
                    }],
                    Name: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffJobCategory(null);
                    }],
                    EmpTypeList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffEmploymentType();
                    }],
                    BCategory: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategory();
                    }],
                    BCategoryDetail: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffBusinessCategoryDetail();
                    }],
                    SalaryType: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getSalaryType();
                    }],
                    ResignationReason: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getResignationreason();
                    }],
                    CurrencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrencyList();
                    }]
                }
            })
            .state("StaffRegistration.narration", {
                parent: "StaffRegistration",
                url: "/narration",
                template: '<staffnarration staff-profession="$resolve.staffProfession" staff-narration-type="$resolve.narrationType" staff-voicetype="$resolve.staffNarrationVoiceType" staff-ageimpression="$resolve.staffNarrationAgeImpression" staff-senseorpurpose="$resolve.staffNarrationSenseOrPurpose" currencylist="$resolve.CurrencyList"></staffnarration>',
                resolve: {
                    staffProfession: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffProfession();
                    }],
                    staffNarrationVoiceType: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationVoiceType();
                    }],
                    staffNarrationAgeImpression: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationAgeImpression();
                    }],
                    staffNarrationSenseOrPurpose: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationSenseOrPurpose();
                    }],
                    narrationType: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffNarrationType();
                    }],
                    CurrencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrencyList();
                    }]
                }
            })
            .state("StaffRegistration.educationalInfo", {
                parent: "StaffRegistration",
                url: "/EducationalInfo",
                template: '<staffeducationalinfo countries="$resolve.countries" educationaldegree="$resolve.educationaldegree" mejorsubject="$resolve.mejorsubject" majorsubject-details="$resolve.majorsubjectDetails"></staffeducationalinfo>',
                //activetab: 'educationalInfo'
                resolve: {
                    countries: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry(null);
                    }],
                    educationaldegree: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getEducationaldegree(null);
                    }],

                    mejorsubject: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getMejorSubject();
                    }],

                    majorsubjectDetails: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getMajorSubjectDetails();
                    }]

                    //majorsubject="$resolve.majorsubject"  majorsubjectDetails="$resolve.majorsubjectDetails"

                }
            })
            //.state("StaffRegistration.skillCertificate", {
            //    parent: "StaffRegistration",
            //    url: "/SkillAndCertificate",
            //    template: '<staff-skill-and-certificate></staff-skill-and-certificate>'

            //})
            //.state("StaffRegistration.bankAndPayment", {
            //　parent: "StaffRegistration",
            //　url: "/BankAndPayment",

            //　template: '<staff-bank-and-payment ></staff-bank-and-payment>',
            //　//resolve: {
            //　//　countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
            //　//　　return StaffRegistrationService.getCountry();
            //　//　}]
            //　//}

            //})
            .state("StaffRegistration.trExperience", {
                parent: "StaffRegistration",
                url: "/TRExperience",
                templateUrl: "App/Components/StaffRegistration/Templates/TRExperience.html"
            })
            .state("StaffRegistration.bankPayment", {
                parent: "StaffRegistration",
                url: "/BankPayment",
                template: '<staff-bank-and-payment country-Data="$resolve.countryData" bank-Account-Type-Data="$resolve.bankAccountTypeData"  currencylist="$resolve.CurrencyList"></staff-bank-and-payment>',
                resolve: {
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    bankAccountTypeData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getBankAccountType();
                    }],
                    CurrencyList: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getCurrencyList();
                    }]
                    //bankData: ['StaffRegistrationService', function(StaffRegistrationService) {
                    //    return StaffRegistrationService.getBank();
                    //}],
                    //staffBankBranchData: ['StaffRegistrationService', function(StaffRegistrationService) {
                    //    return StaffRegistrationService.getBankBranches();
                    //}]
                }
            })
            .state("StaffRegistration.basicHRInfo", {
                parent: "StaffRegistration",
                url: "/BasicHRInfo",
                template: '<staffbasichrinfo -staff-salary-type="$resolve.SalaryType" file-Category = "$resolve.fileCategory" operation-Evaluation ="$resolve.operationEvaluation"></staffbasichrinfo>',
                resolve: {
                    //countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                    //    return StaffRegistrationService.getCountry();
                    //}],
                    SalaryType: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getSalaryType();
                    }],
                    fileCategory: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getFileCategory();
                    }],
                    operationEvaluation: ["StaffRegistrationService", function (StaffRegistrationService) {
                        return StaffRegistrationService.getStaffOperationEvaluation();
                    }]
                }

            })
            .state("StaffRegistration.hrDetail", {
                parent: "StaffRegistration",
                url: "/HRDetail",
                templateUrl: "App/Components/StaffRegistration/Templates/HRDetails.html"
            })
            .state("StaffRegistration.transPro", {
                parent: "StaffRegistration",
                url: "/Transpro",
                template: '<stafftransprocomponent special-skills-details = $resolve.specialSkillsDetails special-skills =$resolve.specialSkills research-skills =$resolve.researchSkills patent-skills =$resolve.patentSkills></stafftransprocomponent>',
                resolve: {
                    specialSkillsDetails: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getSpecialSkillsDetails();
                    }],
                    specialSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getSpecialSkills();
                    }],
                    researchSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getResearchSkills();
                    }],
                    patentSkills: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getPatentSkills();
                    }]
                }
            })
            .state("StaffRegistration.editingPro", {
                parent: "StaffRegistration",
                url: "/editingPro",
                template: '<staffeditingpro></staffeditingpro>',
                resolve: {
                }
            })
            .state("RegistrationTrackList", {
                parent: "home",
                url: '/RegistTrackList',
                template: '<regtracklists branch=$resolve.branch></regtracklists>',
                resolve: {
                    branch: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.branch();
                    }],
                }
            })
            .state("Schedule", {
                parent: "home",
                url: '/Schedule',
                params: { Estimation: null },
                template: '<schedule services="$resolve.services" languages="$resolve.languages"></schedule>',
                resolve: {
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                }
            })
            .state("WorkListTranslationBusiness", {
                parent: "home",
                url: "/WorkListTranslationBusiness",
                template: "<worklisttransbusiness></worklisttransbusiness>",
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                }
            })

            .state("Role", {
                parent: "home",
                url: '/Role',
                template: "<roles></roles>",
                resolve: {}
            })
            .state("Unit", {
                parent: "home",
                url: '/Unit',
                template: "<units></units>",
                resolve: {}
            })
            .state("UnitPrice", {
                parent: "home",
                url: '/UnitPrice',
                template: "<unitprices></unitprices>",
                resolve: {}
            })
            .state("VisaType", {
                parent: "home",
                url: '/staffVisaType',
                template: "<visatypes></visatypes>",
                resolve: {}
            })
            .state("JobType", {
                parent: "home",
                url: "/JobType",
                template: "<jobtypes></jobtypes>",
                resolve: {}
            })
            .state("Division", {
                parent: "home",
                url: "/Division",
                template: "<divisions></divisions>",
                resolve: {

                }
            })
            .state("Culture", {
                parent: "home",
                url: "/Culture",
                template: "<culture></culture>",
                resolve: {

                }
            })
            .state("Team", {
                parent: "home",
                url: "/Team",
                template: "<teams></teams>",
                resolve: {}
            })
            .state("TechnicalSkillCategory", {
                parent: "home",
                url: '/staffTechSkillCategory',
                template: "<techskillcategory></techskillcategory>",
                resolve: {}
            })
            .state("TechnicalSkillItems", {
                parent: "home",
                url: '/staffTechSkillItems',
                template: "<techskillitems></techskillitems>",
                resolve: {}
            })
            .state("StaffType", {
                parent: "home",
                url: "/StaffType",
                template: "<stafftype></stafftype>",
                resolve: {}
            })
            .state("OtherExperiences", {
                parent: "home",
                url: "/OtherExperiences",
                template: "<otherexperiences></otherexperiences>",
                resolve: {}
            })
            .state("StaffTranslationFields", {
                parent: "home",
                url: '/staffTranslationFields',
                template: "<stafftranslationfields></stafftranslationfields>",
                resolve: {}
            })
            .state("StaffTechnicalFields", {
                parent: "home",
                url: "/StaffTechnicalFields",
                template: "<masterstfields></masterstfields>",
                resolve: {}
            })
            .state("StaffMajorSubject", {
                parent: "home",
                url: '/staffMajorSubject',
                template: "<staffmajorsubjects></staffmajorsubjects>",
                resolve: {}
            })
            .state("StaffMajorSubjectDetails", {
                parent: "home",
                url: '/staffMajorSubjectDetails',
                template: "<staffmajorsubjecstdetails></staffmajorsubjecstdetails>",
                resolve: {}
            })
            .state("StaffDevelopmentSkill", {
                parent: "home",
                url: '/staffDevSkill',
                template: "<staffdevelopmentskill></staffdevelopmentskill>",
                resolve: {}
            })
            .state("StaffDevelopmentSkillItem", {
                parent: "home",
                url: "/StaffDevelopmentSkillItem",
                template: "<staffdevskillitem></staffdevskillitem>",
                resolve: {}
            })
            .state("Profession", {
                parent: "home",
                url: '/staffProfession',
                template: "<professions></professions>",
                resolve: {}
            })
            .state("Branch", {
                parent: "home",
                url: '/Branch',
                template: "<branches></branches>",
                resolve: {}
            })
            .state("Bank", {
                parent: "home",
                url: '/Bank',
                template: "<banks></banks>",
                resolve: {}
            })
            .state("BankBranch", {
                parent: "home",
                url: '/BankBranch',
                template: "<brankbranch></brankbranch>",
                resolve: {}
            })
            .state("BankAccount", {
                parent: "home",
                url: '/BankAccount',
                template: "<brankaccount></brankaccount>",
                resolve: {}
            })
            .state("Category", {
                parent: "home",
                url: "/Category",
                template: "<categories></categories>",
                resolve: {}
            })
            .state("CurrentState", {
                parent: "home",
                url: "/CurrentState",
                template: "<currentstates></currentstates>",
                resolve: {}
            })
            .state("Department", {
                parent: "home",
                url: '/Department',
                template: "<departments></departments>",
                resolve: {}
            })
            .state("Education", {
                parent: "home",
                url: '/staffEducation',
                template: "<educations></educations>",
                resolve: {}
            })
            .state("BusinessCategory", {
                parent: "home",
                url: '/staffBusinessCategory',
                template: "<bcategories></bcategories>",
                resolve: {}
            })
            .state("BusinessCategoryDetails", {
                parent: "home",
                url: '/staffBusinessCategoryDetails',
                template: "<bcategorydetails></bcategorydetails>",
                resolve: {}
            })
            .state("Designation", {
                parent: "home",
                url: "/Designation",
                template: "<designation></designation>",
                resolve: {}
            })
            .state("EmployeRegistration", {
                parent: "home",
                //url: "/EmployeeRegistration/{empNo}",
                url: "/EmpRegist/{empNo}",
                // params: { ID: null, },
                params: { 'empNo': null, 'ID': null },
                template: "<employeregistration></employeregistration>",
                resolve: {}
            })
            .state("EmployeeList", {
                parent: "home",
                url: '/EmpList',
                template: "<employeelist><employeelist>",
                resolve: {

                }
            })
            .state("LanguageSkillLevel", {
                parent: "home",
                url: "/LanguageSkillLevel",
                template: "<langskill></langskill>",
                resolve: {}
            })
            .state("LanguageQualification", {
                parent: "home",
                url: '/staffLanguageQualification',
                template: "<langqual></langqual>",
                resolve: {}
            })
            .state("Language", {
                parent: "home",
                url: '/Language',
                template: "<languages></languages>",
                resolve: {}
            })
            .state("JobCategory", {
                parent: "home",
                url: '/staffJobCategory',
                template: "<jobcategories></jobcategories>",
                resolve: {}
            })
            .state("JobCategoryDetails", {
                parent: "home",
                url: '/staffJobCategoryDetails',
                template: "<jobcategorydetails></jobcategorydetails>",
                resolve: {}
            })
            .state("ProfessionalCerificate", {
                parent: "home",
                url: "/ProfessionalCertificate",
                template: "<professionalcerificates></professionalcerificates>",
                resolve: {}
            })
            .state("ProfessionalSpeciality", {
                parent: "home",
                url: "/ProfessionalSpeciality",
                template: "<profspeciality></profspeciality>",
                resolve: {}
            })
            .state("EstimationRoutes", {
                parent: "home",
                url: '/Routes',
                template: "<meroutes></meroutes>",
                resolve: {}
            })
            .state("EstimationServiceType", {
                parent: "home",
                url: '/ServiceType',
                template: "<meservicetypes></meservicetypes>",
                resolve: {}
            })

            .state("TransproLanguagePrice", {
                parent: "home",
                url: '/W_TransproLanguagePrice',
                template: "<translanprice></translanprice>",
                resolve: {}
            })

            .state("EstimationSpecializedField", {
                parent: "home",
                url: '/Specialized',
                template: "<mesfields></mesfields>",
                resolve: {}
            })
            .state("EstimationSubSpecializedField", {
                parent: "home",
                url: '/SubSpecialized',
                template: "<estisubspecializedfield></estisubspecializedfield>",
                resolve: {}
            })
            .state("TranslationEstimation", {
                parent: "home",
                url: "/TransEstimation/:estimationNo",
                params: { id: null, Estimation: null },

                template: '<translation-estimation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" page-count-type="$resolve.pageCountType" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></translation-estimation>', //manipulate-user-access="$resolve.manipulateUserAccess"
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],

                    pageCountType: ["estimationService", function (estimationService) {
                        return estimationService.estimationPageCountTypes();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]

                    //,manipulateUserAccess: ["estimationService", function (estimationService) {
                    //    return estimationService.manipulateUserAccess();
                    //}]
                }
            })
            .state("EstimationList", {
                parent: "home",
                url: '/T_EstimationList',
                template: '<estimation-list analysedata="$resolve.analysedata" branchoffice="$resolve.branchoffice" companytypes="$resolve.companytypes" routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" companies="$resolve.companies"></estimation-list>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationType();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    companytypes: ["companyService", function (companyService) {
                        return companyService.getCompanyType();
                    }],
                    branchoffice: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.branch();
                    }],
                    analysedata: ["estimationService", function (estimationService) {
                        return estimationService.estimationAnalysedData();
                    }]
                }
            })
            .state("TaskQuotationInput", {
                parent: "home",
                url: "/ProjectEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<task-quotation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></task-quotation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("ApprovalEstimationList", {
                parent: "home",
                url: "/ApprovalEstimationList",
                template: '<approvalestimation-list></approvalestimation-list>',
                resolve: {}
            })
            .state("OverheadCostQuotation", {
                parent: "home",
                url: "/InsideEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<overhead-cost routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></overhead-cost>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("OverheadCostQuotationOrderDetails", {
                parent: "home",
                url: "/OverheadCostQuotationOrderDetails",
                template: "<overheadcostorderdetails></overheadcostorderdetails>",
                resolve: {}
            })
            .state("TranslationOrderDetails", {
                parent: "home",
                url: "/TransOrderDetails/:estimationNo",
                params: { id: null, Estimation: null },
                template: '<trans-order routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" page-count-type="$resolve.pageCountType"></trans-order>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    pageCountType: ["estimationService", function (estimationService) {
                        return estimationService.estimationPageCountTypes();
                    }]
                }
            })
            .state("DTPOrderDetails", {
                parent: "home",
                url: "/DTPOrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<dtp-details routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></dtp-details>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("TaskOrderDetails", {
                parent: "home",
                url: "/TaskOrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<taskdetails routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" page-count-type="$resolve.pageCountType"></taskdetails>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    pageCountType: ["estimationService", function (estimationService) {
                        return estimationService.estimationPageCountTypes();
                    }]
                }
            })
            .state("OrderDetails", {
                parent: "home",
                url: "/OrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<orderdetails routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></orderdetails>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("InterpretationOrderDetails", {
                parent: "home",
                url: "/InterprOrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<interpretationorderdetails routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></interpretationorderdetails>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("EstimationInterpretationQuotation", {
                parent: "home",
                url: "/InterpEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<estiinterpretationquotation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></estiinterpretationquotation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("SalesManagement", {
                parent: "home",
                url: "/salesManagement",
                template: "<sales-management-component> </sales-management-component>"
            })
            .state("CompanyTradingCategory", {
                parent: "home",
                url: '/CompanyTradingCategory',
                template: "<mctradingcategory></mctradingcategory>",
                resolve: {}
            })
            .state("CompanyTradingCategoryItem", {
                parent: "home",
                url: '/CompanyTradingCategoryItem',
                template: "<mctradingcategoryitem></mctradingcategoryitem>",
                resolve: {}
            })

            .state("AffiliateCompanyDetails", {
                parent: "home",
                url: '/AffiliateComDetails',
                template: "<affiliatecompanydetails></affiliatecompanydetails",
                resolve: {}
            })
            .state("AffiliationRegistrationEditPage", {
                parent: "home",
                //url: "/AffiliationRegistrationEditPage/{ID}",
                url: "/AffiliateRegistEdit/{ID}",
                params: { 'ID': null, 'CultureID': null },
                template: "<affiliatecompanyregistration></affiliatecompanyregistration>",
                resolve: {}
            })
            .state("AffiliateDashboard", {
                parent: "home",
                url: '/AffiliateDashboard',
                template: "<affiliatedashboard></affiliatedashboard>",
                resolve: {}
            })
            .state("AffiliatePaymentListForAffiliateCompany", {
                parent: "home",
                url: '/AffiliatePayList_Affiliate',
                template: "<affiliatepaymentlistforaffiliatecompany></affiliatepaymentlistforaffiliatecompany>",
                resolve: {}
            })
            .state("AffiliatePaymentListForClient", {
                parent: "home",
                url: '/AffiliatePayList_Client',
                template: "<affiliatepaymentlistforclient></affiliatepaymentlistforclient>",
                resolve: {}
            })
            .state("AffiliatePaymentListForStaff", {
                parent: "home",
                url: '/AffiliatePayList_Staff',
                template: "<affiliatepaymentlistforstaff></affiliatepaymentlistforstaff>",
                resolve: {}
            })
            .state("InterpretationFields", {
                parent: "home",
                url: '/staffInterpretationFields',
                template: "<interpretationfields></interpretationfields>",
                resolve: {}
            })
            .state("CompanyIndustryClassification", {
                parent: "home",
                url: '/CompanyIndustryClassifi',
                template: "<companyindustryclassification></companyindustryclassification>",
                resolve: {}
            })
            .state("CompanyIndustryClassificationItem", {
                parent: "home",
                url: '/CompanyIndustryClassifiItem',
                template: "<companyindustryclassificationitem></companyindustryclassificationitem>",
                resolve: {}
            })
            .state("CompanyTradingDivision", {
                parent: "home",
                url: "/CompanyTradingDivision",
                template: "<companytradingdivision></companytradingdivision>",
                resolve: {}
            })
            .state("CompanyRegistration", {
                parent: "home",
                url: "/CompanyRegistration",
                params: { ID: null, },
                template: '<companyregistration config-Data="$resolve.Config" bank-Data="$resolve.bankData" bank-Account-Type-Data="$resolve.bankAccountTypeData" bank-Branch-Data="$resolve.BankBranchData" designation-Data="$resolve.Designation"></companyregistration>',
                resolve: {
                    Config: ['companyService', function (companyService) {
                        return companyService.getCompanyConfigData();
                    }],
                    bankData: ['companyService', function (companyService) {
                        return companyService.getBank();
                    }],
                    bankAccountTypeData: ['companyService', function (companyService) {
                        return companyService.getBankAccountType();
                    }],
                    BankBranchData: ['companyService', function (companyService) {
                        return companyService.getBankBranches();
                    }],
                    Designation: ['companyService', function (companyService) {
                        return companyService.getDesignation();
                    }],
                }
            })
            .state("CompanyRegistration.salesAppointment", {

                url: "/salesAppointment",
                parent: "CompanyRegistration",
                template: '<sales-appointment -All-Status = "$resolve.Status" -All-Type = "$resolve.Type"></sales-appointment>',
                resolve: {
                    Status: ['companyService', function (companyService) {
                        return companyService.getAppoitmnetStatusAll();
                    }],
                    Type: ['companyService', function (companyService) {
                        return companyService.getAppointmentTypeAll();
                    }],

                }
            })
            .state("CompanyRegistrationParent", {

                parent: "home",
                //url: "/CompanyBasicInfo/:no",
                url: "/Company/:no",
                params: { Company: null, ID: null, no: null },
                template: '<companyregistrationparent config-Data = "$resolve.configData" ></companyregistrationparent>',
                resolve: {
                    configData: ['companyService', function (companyService) {
                        return companyService.getCompanyConfigData();
                    }]
                }
            })
            .state("CompanyRegistrationParent.companyDetailInfo", {
                parent: "CompanyRegistrationParent",
                url: "/DetailInfo",
                params: { Company: null, ID: null, no: null },
                //templateUrl: "App/Components/Company/Template/Tab_DetailInfo.html"
                template: '<company-detail-info></company-detail-info>'
            })

            .state("CompanyRegistrationParent.companyBasicInfo", {
                parent: "CompanyRegistrationParent",
                url: "/BasicInfo",
                //templateUrl: "App/Components/Company/Template/Tab_BasicInfoTest.html",
                template: '<company-basic-info config-Data="$resolve.configData" client-Type="$resolve.clientType" person-Data="$resolve.personData" country-Data="$resolve.countryData"></company-basic-info>',
                resolve: {
                    configData: ['companyService', function (companyService) {
                        return companyService.getCompanyConfigData();
                    }],
                    personData: ['companyService', function (companyService) {
                        return companyService.getCompanyPersonData();
                    }],
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],

                    clientType: ['companyService', function (companyService) {
                        return companyService.getCompanyTradingCategory();
                    }]
                }
            })
            //start 

            .state("UserChangePassword", {
                parent: "home",
                url: "/changePassword/{Username}",
                params: { 'ID': null, "Username": null, "EmployeeID": null, 'CultureID': null },
                //params: {ID: null},
                template: "<employeechangepassword></employeechangepassword>"
                // controller: "EmployeePasswordChangeController"
            })
            //.state("ChangePassword", {
            //    parent: "home",
            //    url: "/changePassword/{RegistrationID}",
            //    params: { 'ID': null, "RegistrationID": null, "EmployeeID": null ,'CultureID': null },
            //    //params: {ID: null},
            //    template: "<employeechangepassword></employeechangepassword>",
            //   // controller: "EmployeePasswordChangeController"
            //})
            //end



            //Start 

            .state("CompanyRegistrationParent.salesrecord", {
                parent: "CompanyRegistrationParent",
                url: "/salesrecord",
                templateUrl: "App/Components/Company/Template/Tab_SalesRecord.html"
                // template: '<company-sales-record></company-sales-record>'
            })

            .state("CompanyRegistrationParent.subcontact", {
                parent: "CompanyRegistrationParent",
                url: "/subcontact",
                templateUrl: "App/Components/Company/Template/Tab_Subcontact.html"
                //template: '<subcontract config-data="$resolve.config"></subcontract>',
                //resolve: {
                //    config: ['companyservice', function(companyservice) {
                //        return companyservice.getcompanyconfigdata();
                //    }],
                //}
            })
            .state("CompanyRegistrationParent.bank", {
                parent: "CompanyRegistrationParent",
                url: "/BankPayment",
                template: '<company-bank-payment></company-bank-payment>'
            })
            .state("CompanyRegistrationParent.affiliationinfo", {
                parent: "CompanyRegistrationParent",
                url: "/affiliation-info",
                templateUrl: "App/Components/Company/Template/Tab_AffiliationInfo.html"
            })
            .state("CompanyRegistrationParent.transpro", {
                parent: "CompanyRegistrationParent",
                url: "/trans-pro",
                templateUrl: "App/Components/Company/Template/Tab_Transpro.html"

            })
            .state("CompanyRegistrationParent.editingpro", {
                parent: "CompanyRegistrationParent",
                url: "/editing-pro",
                templateUrl: "App/Components/Company/Template/Tab_Editingpro.html"
            })

            //End


            //.state("CompanyRegistration.companyInfo", {
            //    url: "/CompanyInfo",
            //    templateUrl: "App/Components/Company/Template/Tab_BasicInfo.html"
            //})
            //.state("CompanyRegistration.detailInfo", {
            //    url: "/DetailInfo",
            //    templateUrl: "App/Components/Company/Template/Tab_DetailInfo.html"
            //})
            //.state("companyregistration.salesrecord", {
            //    url: "/salesrecord",
            //    templateurl: "app/components/company/template/tab_salesrecord.html"
            //})
            //.state("companyregistration.subcontact", {
            //    url: "/subcontact",
            //    template: '<subcontract config-data="$resolve.config"></subcontract>',
            //    resolve: {
            //        config: ['companyservice', function(companyservice) {
            //            return companyservice.getcompanyconfigdata();
            //        }],
            //    }
            //})
            //.state("companyregistration.bank", {
            //    url: "/bankpayment",
            //    templateurl: "app/components/company/template/tab_bankpayment.html"
            //})
            //.state("companyregistration.transpro", {
            //    url: "/trans-pro",
            //    templateurl: "app/components/company/template/tab_transpro.html",

            //})
            //.state("companyregistration.editingpro", {
            //    url: "/editing-pro",
            //    templateurl: "app/components/company/template/tab_editingpro.html"
            //})
            //.state("CompanyRegistration.hrpartner", {
            //    url: "/HR-Partner",
            //    templateUrl: "App/Components/Company/Template/Tab_Hrpartner.html"
            //})
            //.state("CompanyRegistration.dispatch", {
            //    url: "/Dispatch",
            //    templateUrl: "App/Components/Company/Template/Tab_Dispatch.html"
            //})
            .state("CompanyList", {
                parent: "home",
                url: '/CompanyList',
                template: '<companylist></companylist>',
                resolve: {
                    //CompanyList: ['companyService', function (companyService) {
                    //    return companyService.getCompany();
                    //}]
                }
            })
            .state("CompanyBusiness", {
                parent: "home",
                url: '/CompanyBusiness',
                template: "<companybusiness></companybusiness>",
                resolve: {}
            })
            .state("CompanyBusinessSpeciality", {
                parent: "home",
                url: '/CompanyBusinessSpeciality',
                template: "<companybusinessspeciality></companybusinessspeciality>",
                resolve: {}
            })
            .state("AgentBusiness", {
                parent: "home",
                url: "/AgentBusiness",
                template: "<agentbusiness></agentbusiness>",
                resolve: {}
            })
            .state("AgentCharacterstics", {
                parent: "home",
                url: "/AgentCharacterstics",
                template: "<agentcharacterstics></agentcharacterstics>",
                resolve: {}
            })
            .state("AgentFreeDesignation", {
                parent: "home",
                url: "/AgentFreeDesignation",
                template: "<agentfreedesignation></agentfreedesignation>",
                resolve: {}
            })
            .state("TechnicalSkillLevel", {
                parent: "home",
                url: "/TechnicalSkillLevel",
                template: "<technicalskilllevel></technicalskilllevel>",
                resolve: {}
            })
            .state("StaffKnowledgeField", {
                parent: "home",
                url: '/staffKnowledgeField',
                template: "<staffknowledgefields></staffknowledgefields>",
                resolve: {}
            })
            .state("StaffKnowledgeFieldItem", {
                parent: "home",
                url: '/staffKnowledgeFieldItem',
                template: "<staffknowledgefielditems></staffknowledgefielditems>",
                resolve: {}
            })
            .state("StaffMedicalField", {
                parent: "home",
                url: "/StaffMedicalField",
                template: "<staffmedicalfield></staffmedicalfield>",
                resolve: {}
            })
            .state("StaffPatentField", {
                parent: "home",
                url: "/StaffPatentField",
                template: "<staffpatentfield></staffpatentfield>",
                resolve: {}
            })
            .state("StaffResearchField", {
                parent: "home",
                url: "/StaffResearchField",
                template: "<staffresearchfield></staffresearchfield>",
                resolve: {}
            })
            .state("HiworkLanguagePrice", {
                parent: "home",
                url: "/HiworkLanguagePrice",
                template: "<hiworklanguageprices></hiworklanguageprices>",
                resolve: {}
            })
            .state("ShortTermEstimation", {
                parent: "home",
                //url: "/ShortTermEstimation/:id",
                url: "/ShortTermEstimation/:estimationNo",
                params: { Estimation: null },
                template: '<shortterm routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></shortterm>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices("ST");
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("WebOrderModule", {
                parent: "home",
                url: "/WebOrderDetails/:id",
                params: { OrderInformation: null },
                template: '<webordermodule routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></webordermodule>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices("ST");
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("SuperAdmin", {
                parent: "home",
                url: "/SuperAdmin",
                template: "<superadmin></superadmin>",
                resolve: {}
            })
            .state("StaffPayment", {
                parent: "home",
                url: '/StaffPayment',
                template: '<staffpayment analysedata="$resolve.analysedata"></staffpayment>',
                resolve: {
                    analysedata: ["estimationService", function (estimationService) {
                        return estimationService.estimationAnalysedData();
                    }]
                }

            }).state("AffiliatePayment", {
                parent: "home",
                url: '/AffiliatePayment',
                template: '<affiliate-payment ></affiliate-payment>',
                resolve: { }

            })
            .state("ClientPayment", {
                parent: "home",
                url: '/ClientPayment',
                template: '<clientpayment analysedata="$resolve.analysedata"></clientpayment>',
                resolve: {
                    analysedata: ["estimationService", function (estimationService) {
                        return estimationService.estimationAnalysedData();
                    }]
                }
            })
            .state("IncomeCheck", {
                parent: "home",
                url: '/IncomeCheck',
                template: '<incomecheck analysedata="$resolve.analysedata" ></incomecheck>',
                resolve: {
                    analysedata: ["estimationService", function (estimationService) {
                        return estimationService.estimationAnalysedData();
                    }]
                }

            })
            .state("CompanySalesItems", {
                parent: 'home',
                url: '/SalesAmount',
                //url: '/companySalesItems',
                template: '<company-Salesitems ></company-Salesitems>',
                resolve: {}
            })
            .state("DispatchIntroduction", {
                parent: 'home',
                url: '/DispatchEstimation/:estimationNo',
                //params: { id: null, Estimation: null },
                template: '<dispatch-introduction routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" language-Lvl="$resolve.getLanguageLvl"></dispatch-introduction>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }],
                    getLanguageLvl: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguageLvl();
                    }],
                }
            })

            .state("HrStock", {
                parent: 'home',
                url: '/StockList',
                template: '<hr-Stock languages="$resolve.languages" language-Lvl="$resolve.getLanguageLvl"></hr-Stock>',
                resolve: {
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }]
                }
            })

            .state("HrStockManagement", {
                parent: 'home',
                url: '/StockListManagement',
                template: '<hr-stock-management></hr-stock-management>',
                resolve: {}
            })
            .state("HrProjectEstimation", {
                parent: 'home',
                url: '/hr-project-estimation/:estimationNo',
                params: { Estimation:null},
                template: '<hr-project-estimation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></hr-project-estimation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }]
                }
            })
            .state("hrOrderDetails", {
                parent: "home",
                url: "/hrOrderDetails/:estimationNo",
                params: { Estimation: null },
                template: '<hr-project-details routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" page-count-type="$resolve.pageCountType"></hr-project-details>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    pageCountType: ["estimationService", function (estimationService) {
                        return estimationService.estimationPageCountTypes();
                    }]
                }
            })
            .state("boardManagement", {
                parent: 'home',
                url: '/board-management',
                template: '<board-management languages="$resolve.languages" countries="$resolve.countries" branchoffice="$resolve.branchoffice"></board-management>',
                resolve: {
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    countries: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    branchoffice: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.branch();
                    }]
                }
            })
            .state("DispatchOrderDetails", {
                parent: 'home',
                url: '/dispatchOrderDetails/:estimationNo',
                template: '<dispatch-Order-Details routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></dispatch-Order-Details>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })

            .state("InternationalExchangeOrderDetails", {
                parent: 'home',
                url: '/exchangeOrderDetails/:estimationNo',
                template: '<exchange-Order-Details routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList"></exchange-Order-Details>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            })
            .state("HumanResourceBusinessSettings", {
                parent: 'home',
                url: '/hrSettings',
                template: '<human-Resource-Business-Settings></human-Resource-Business-Settings>',
                resolve: {}
            })
            .state("InternationalExchangeQuotation", {
                parent: 'home',
                url: '/ExchangeEstimation/:estimationNo',
                template: '<international-Exchange-Quotation routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" countryList="$resolve.countryData"  language-Lvl="$resolve.getLanguageLvl"></international-Exchange-Quotation>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices(1);
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }],
                    countryData: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getCountry();
                    }],
                    getLanguageLvl: ['StaffRegistrationService', function (StaffRegistrationService) {
                        return StaffRegistrationService.getLanguageLvl();
                    }],
                }
            })
            .state("PostingRight", {
                parent: 'home',
                url: '/hrEstimationList',
                template: '<posting-Right analysedata="$resolve.analysedata" branchoffice="$resolve.branchoffice" companytypes="$resolve.companytypes" routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" companies="$resolve.companies"></posting-Right>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationType();
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    companytypes: ["companyService", function (companyService) {
                        return companyService.getCompanyType();
                    }],
                    branchoffice: ["advancedStaffSearchService", function (advancedStaffSearchService) {
                        return advancedStaffSearchService.branch();
                    }],
                    analysedata: ["estimationService", function (estimationService) {
                        return estimationService.estimationAnalysedData();
                    }]
                }
            })
            .state("ScoutList", {
                parent: 'home',
                url: '/ScoutList',
                template: '<scout-List></scout-List>',
                resolve: {}
            })

            .state("ScoutRegistrationSearch", {
                parent: 'home',
                url: '/ScoutRegistSearch',
                template: '<scout-Registration-Search languages="$resolve.languages"></scout-Registration-Search>',
                resolve: {
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                }
            })

            .state("ScoutRegistrationResultList", {
                parent: 'home',
                url: '/ScoutRegistList',
                template: '<scout-Registration-Result-List></scout-Registration-Result-List>',
                resolve: {}
            })

            .state("JobOfferList", {
                parent: 'home',
                url: '/JobOfferList',
                template: '<job-Offer-List></job-Offer-List>',
                resolve: {}
            })
            .state("JobOfferRegistration", {
                parent: 'home',
                url: '/jobOfferRegist/:no',
                template: '<job-Offer-Registration></job-Offer-Registration>',
                resolve: {}
            })
            .state("DispatchSourceManagementLedger", {
                parent: 'home',
                url: '/dispatchSourceMGMT',
                template: '<dispatch-Source-Management-Ledger routes="$resolve.routes"></dispatch-Source-Management-Ledger>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                }
            })
            .state("CheckMessageFraud", {
                parent: 'home',
                url: '/checkMSGFraud',
                template: '<check-Message-Fraud ></check-Message-Fraud>'

            })
            .state("PostingManagement", {
                parent: 'home',
                url: '/postingMGMT',
                template: '<posting-Management ></posting-Management>'

            })

            .state("StaffTaxReport", {
                parent: "home",
                url: "/StaffTaxReport",
                template: "<stafftaxreport></stafftaxreport>",
                resolve: {}

            })
            .state("Notice", {
                parent: "home",
                url: '/Notice',
                template: "<notice></notice>",
                resolve: {}

            })
            .state("StaffSoftwareskill", {
                parent: "home",
                url: '/staffSoftwareSkill',
                template: "<staffsoftwareskill></staffsoftwareskill>",
                resolve: {}

            })
            .state("StaffSalaryType", {
                parent: "home",
                url: '/staffSalaryType',
                template: "<staffsalarytype></staffsalarytype>",
                resolve: {}

            })
            .state("StaffResignationReason", {
                parent: "home",
                url: '/staffResistReason',
                template: "<staffresignationreason></staffresignationreason>",
                resolve: {}

            })
            .state("StaffTransproSpecialSkillsCategory", {
                parent: "home",
                url: '/staffSpecialSkillsCategory',
                template: "<stafftransprospecialskillscategory></stafftransprospecialskillscategory>",
                resolve: {}
            })

            .state("StaffTransproSpecialSkills", {
                parent: "home",
                url: "/StaffTransproSpecialSkills",
                template: "<stafftransprospecialskills></stafftransprospecialskills>",
                resolve: {}

            })
            .state("InquiryList", {
                parent: "home",
                url: '/W_InquiryList',
                template: "<inquirylist></inquirylist>",
                resolve: {}
            })
            .state("TotalAnnualSales", {
                parent: 'home',
                url: '/A_totalAnnual',
                template: '<total-Annual-Sales></total-Annual-Sales>',
                resolve: {}
            })
            .state("MonthlyDailySales", {
                parent: 'home',
                url: '/A_monthlyDaily',
                template: '<monthly-Daily-Sales routes="$resolve.routes" analysedata="$resolve.analysedata"></monthly-Daily-Sales>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }]
                }
            })
            .state("EmployeeSpecificAnalysis", {
                parent: 'home',
                url: '/A_EmployeeSpecific',
                template: '<employee-Specific-Analysis routes="$resolve.routes" analysedata="$resolve.analysedata"></employee-Specific-Analysis>', //'<employee-Specific-Analysis routes="$resolve.routes" services="$resolve.services" sourceofregistration="$resolve.sourceofregistration" language="$resolve.language" languagelevel="$resolve.languagelevel" age="$resolve.age" nationalitygroup="$resolve.nationalitygroup" nationality="$resolve.nationality" visatype="$resolve.visatype" visaexpire="$resolve.visaexpire" snsaccount="$resolve.snsaccount" dtp="$resolve.dtp" technicalskillparent="$resolve.technicalskillparent" developmentskillparent="$resolve.developmentskillparent" knowledgeskillparent="$resolve.knowledgeskillparent" medicalskillparent="$resolve.medicalskillparent" officetype="$resolve.officetype" webtype="$resolve.webtype" translationtools="$resolve.translationtools" toolname="$resolve.toolname" design="$resolve.design" softwarename="$resolve.softwarename" tin="$resolve.tin" iin="$resolve.iin" nin="$resolve.nin" narrationperformance="$resolve.narrationperformance"></employee-Specific-Analysis>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }]
                }
            })
            .state("AccumulatedSalesByCompany", {
                parent: 'home',
                url: '/A_accumulated_Company',
                template: '<accumulated-Sales-By-Company></accumulated-Sales-By-Company>',
                resolve: {}
            })
            .state("TransTeamSales", {
                parent: 'home',
                url: '/A_transTeam',
                template: '<trans-Team-Sales routes="$resolve.routes" analysedata="$resolve.analysedata"></trans-Team-Sales>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }]
                }
            })
            .state("TransWeeklySales", {
                parent: 'home',
                url: '/A_transWeekly',
                template: '<trans-Weekly-Sales companytypes="$resolve.companytypes" routes="$resolve.routes" analysedata="$resolve.analysedata"></trans-Weekly-Sales>',
                resolve: {
                    companytypes: ["companyService", function (companyService) {
                        return companyService.getCompanyType();
                    }],
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }]
                }
            })
            .state("TransLanguageSales", {
                parent: 'home',
                url: '/A_transLanguage',
                template: '<trans-Language-Sales></trans-Language-Sales>',
                resolve: {}
            })
            .state("TransNumercalManagement", {
                parent: 'home',
                url: '/A_transNumercal',
                template: '<trans-Numercal-Management routes="$resolve.routes" analysedata="$resolve.analysedata"></trans-Numercal-Management> ',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }]
                }
            })
            .state("PaymentToRealTimeStaff", {
                parent: 'home',
                url: '/A_payment_RealTimeStaff',
                template: '<payment-To-Real-Time-Staff></payment-To-Real-Time-Staff> ',
                resolve: {}
            })
            .state("HrNumericalManagement", {
                parent: 'home',
                url: '/A_HrNumerical',
                template: '<hr-Numerical-Management></hr-Numerical-Management> ',
                resolve: {}
            })
            .state("HrIndividualSales", {
                parent: 'home',
                url: '/A_hrIndividual',
                template: '<hr-Individual-Sales></hr-Individual-Sales> ',
                resolve: {}
            })
            .state("TransProSales", {
                parent: 'home',
                url: '/A_transPro',
                template: '<trans-Pro-Sales></trans-Pro-Sales> ',
                resolve: {}
            })
            .state("DevTeamSales", {
                parent: 'home',
                url: '/A_devTeam',
                template: '<dev-Team-Sales></dev-Team-Sales> ',
                resolve: {}
            })
            .state("PaymentAndTaxReport", {
                parent: 'home',
                url: '/PayAndTax',
                template: '<payment-And-Tax-Report></payment-And-Tax-Report> ',
                resolve: {}
            })

            .state("AdvertizementSettings", {
                parent: "home",
                url: '/W_AdvertizementSettings',
                template: "<advertizementsettings></advertizementsettings>",
                resolve: {}

            })

            .state("EmailTemplateSetting", {
                parent: "home",
                url: '/EmailTemplate',
                template: "<emailtemplatesetting></emailtemplatesetting>",
                resolve: {}
            })

            .state("WebOrderList", {
                parent: "home",
                url: '/W_OrderList',
                template: '<weborderlist routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></weborderlist>',
                resolve: {

                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices("ST");
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]

                }
            }).state("Penalty", {
                parent: "home",
                url: "/Penalty",
                template: "<penlty></penlty>",
                resolve: {

                }
            })
            .state("ClaimList", {
                parent: "home",
                url: '/W_ClaimList',
                template: '<claimlist routes="$resolve.routes" services="$resolve.services" languages="$resolve.languages" business-categories="$resolve.businessCategories" specialized-fields="$resolve.specializedFields" sub-specialized-fields="$resolve.subSpecializedFields" currency-list="$resolve.currencyList" translation-certificate-settings-list="$resolve.translationCertificateSettingsList"></claimlist>',
                resolve: {
                    routes: ["estimationService", function (estimationService) {
                        return estimationService.estimationRoutes();
                    }],
                    services: ["estimationService", function (estimationService) {
                        return estimationService.estimationServices("ST");
                    }],
                    languages: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    businessCategories: ["estimationService", function (estimationService) {
                        return estimationService.businessCategories();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }],
                    subSpecializedFields: ["estimationService", function (estimationService) {
                        return estimationService.subSpecializedFields();
                    }],
                    currencyList: ["estimationService", function (estimationService) {
                        return estimationService.currencyList();
                    }],
                    translationCertificateSettingsList: ["estimationService", function (estimationService) {
                        return estimationService.translationCertificateSettingsList();
                    }]
                }
            }).state("editingproManagement", {
                parent: "home",
                url: "/editingproManagement",
                params: { selectedTab:null},
                templateUrl: "App/Components/EditingproManagement/Templates/editingproManagementParent.html",
                controller: "editingproManagementController"
            })
            .state("editingproManagementS", {
                parent: "home",
                url: "/editingproManagement/:selectedTab",
                params: { selectedTab: null },
                templateUrl: "App/Components/EditingproManagement/Templates/editingproManagementParent.html",
                controller: "editingproManagementController"
            })
          .state("transproManagement", {
                parent: "home",
                url: "/transproManagement",
                params: { selectedTab: null },
                templateUrl: "App/Components/TransproManagement/Templates/transproManagementParent.html",
                controller: "transproManagementController"
            }).state("transproManagementS", {
                parent: "home",
                url: "/transproManagement/:selectedTab",
                params: { selectedTab: null },
                templateUrl: "App/Components/TransproManagement/Templates/transproManagementParent.html",
                controller: "transproManagementController"
            })
            .state("editingproOrderList", {
                parent: "home",
                url: "/W_orderlist_EP",
                params: {},
                templateUrl: "App/Components/EditingproOrderList/Templates/editingproOrderList.html",
                controller: "editingproOrderListController",
                resolve: {
                    languageList: ["estimationService", function (estimationService) {
                        return estimationService.estimationLanguages();
                    }],
                    specializedFields: ["estimationService", function (estimationService) {
                        return estimationService.specializedFields();
                    }]
                }
            }).state("pcsmsManagement", {
                parent: "home",
                url: "/pcsmsManagement",
                params: { },
                templateUrl: "App/Components/PCSMSManagement/Templates/PCSMSManagementParent.html",
                controller: "pcsmsManagementController"
            })
            .state("editingproOrderDetails", {
                parent: "home",
                url: "/WebOrderDatails_EP/:estimationNo",
                params: {},
                templateUrl: "App/Components/EditingproOrderList/Templates/editingproOrderDetails.html",
                controller: "editingproOrderDetailsController"
            });
    });


    //hiworkApp.config(['$qProvider', function ($qProvider) {
    //    $qProvider.errorOnUnhandledRejections(false);
    //}]);

    hiworkApp.config(function ($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var alerting = $injector.get("alerting");
                alerting.addDanger(exception.message);
            };
        });
    });

    hiworkApp.run(function ($rootScope, i18nService, sessionFactory, AppStorage, startUpService) {
        //Setup Culture When Language Change

        //Setup Culture When Language Change
        startUpService.localeCalander();
        startUpService.localeUiGrid();
        //Calander Culture
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            var appDocument = angular.element(document);
            appDocument.find('.nav-home-menu').on('click', function () {
                appDocument.find('#navMenu').removeClass('in');
            });
            //For Changing Language in UI GRID
            //For Changing Language IN UI GRID
        });
    });


    /* Application Constants
        ======================================================*/
    hiworkApp.constant("appSettings", {
        API_BASE_URL: 'http://localhost:58579/',//'http://localhost:58579/',
        //API_BASE_URL: 'http://163.47.35.165:8038/',
        API_PHOTO_URL: 'https://bcause-api.com/Upload/AllPhotos/',
        APPLICATION_VERSION: '1.0.64',
        ApplicationId: 1 //HiWork ID
    });
    /* Notification Constants
    ======================================================*/
    hiworkApp.constant("Notify", {
        DATA_READY: "dataFactory::dataReady",
        LOGIN_SUCCESSFUL: "accountFactory::loginSuccessful",
        LOGIN_UNSUCCESSFUL: "accountFactory::loginUnSuccessful",
        LOGOUT_SUCCESSFUL: "accountFactory::logoutSuccessful"

    });
    hiworkApp.constant("appMenu", {
        Dashboard: 1,
        Role: 2,
        Country: 3,
        Division: 4,
        Branch: 5,
        Department: 6
    });
    hiworkApp.constant("EstimationType", {
        Translation: 1,
        Interpreter: 2,
        SchoolExcursion: 3,
        ShortTermDispatch: 4,
        Project: 5,
        DTP: 6,
        Narration: 7,
        //TapeOver: 8,
        WebCreation: 8,
        Transcription: 9,
        OverheadCost: 10,
        Distpatch: 13,
        Introduction : 1005,
        InternationalExchange: 1006,
        TeacherDispatch: 1010,
        Editing: 1008,
        EditingPro : 14,
        TransPro: 12,
        JobSearcher: 11,
        HRProject:1009
    });

    hiworkApp.constant("EstimationStatus", {
        Created: 1,
        RequestedForApproval: 2,
        Approved: 3,
        Requested: 4,
        Confirmed: 5,
        Ordered: 6,
        OrderLost: 7
    });
    hiworkApp.constant("UserType", {
        SuperAdmin: 1,
        Employee: 2,
        Maintenance: 3,
        Guest: 4,
        HR: 5,
        Accountant: 6,
        Translator: 7
    });
    hiworkApp.constant("ConstantVariable", {
        selectClientGlobalVariable: null
    });
    hiworkApp.constant("AppStorage", {
        currentLanguage: "currentLanguage",
        userData: "userData",
        cultureData: "cultureData",
        appData: "appData",
        staffSkillAndCertificate: "staffSkillAndCertificate"
    });
    hiworkApp.constant("TranslationLevelType", {
        Light: 1,
        Business: 2,
        Expert: 3
    });

    hiworkApp.constant("EstimationDefaultStatus", {
        init: {
            BtnOrderDetails: false,
            BtnTemporaryRegistration: true,
            BtnProjectInitiation: true,
            BtnApprovalRequest: false,
            BtnApproval: false,
            BtnQuotationEmail: false,
            BtnQuotationRequest: false,
            BtnConfirmationEmail: false,
            BtnDelete: false
        }
    });

    angular.module('hiworkApp').config(['$provide', function ($provide) {
        $provide.decorator('$state', ['$delegate', '$window',
            function ($delegate, $window) {
                var extended = {
                    goNewTab: function (stateName, params) {
                        console.info(params, 'params');
                        $delegate.params = params;
                        debugger;
                        $window.open($delegate.href(stateName, params, { absolute: true }), '_blank');
                    }
                };
                angular.extend($delegate, extended);
                
                return $delegate;
            }]);
    }]);

    hiworkApp.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
           // $rootScope.$stateParams = $stateParams;
        }]);

    

}());