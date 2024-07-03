(function() {
    'use strict';

    angular
        .module('hiworkApp')
        .service('startUpService', Service)

    /** @ngInject */
    function Service($rootScope, tmhDynamicLocale, AppStorage, sessionFactory, $locale, i18nService) {

        this.localeCalander = localeCalander;
        this.localeUiGrid = localeUiGrid;
        //UI Grid Locale Start
        function localeUiGrid() {
            var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
            var userData = sessionFactory.GetData(AppStorage.userData);
            i18nService.setCurrentLang(currentCulture);
        }
        //UI Grid Locale Start

        //Calander Locale Start
        function localeCalander() {
            var currentCulture = sessionFactory.GetData(AppStorage.currentLanguage);
            var localeDictionary = {
                'en': 'en',
                'jp': 'ja',
                'cn': 'zh',
                'kr': 'ko',
                'fr': 'fr',
                'tl': 'th'
            };
            $rootScope.model = { selectedLocale: localeDictionary[currentCulture] };
            $rootScope.changeLocale = tmhDynamicLocale.set(localeDictionary[currentCulture]);
            $rootScope.availableLocales = {
                'en': 'English',
                'fr': 'French',
                'ja': 'Japanese',
                'ko': 'Korean',
                'zh': 'Chinese',
                'th': 'Thailand'
            };
            $rootScope.$locale = $locale;
            $rootScope.changeLocale = tmhDynamicLocale.set;
        }
        //Calander Locale End
    }
}());