(function () {
    var cupOfExcellenceApp = angular.module('cupOfExcellenceApp', ['ngRoute',
        'TabularResultsCtrl','dropDownDataService', 'capitalizeFilter',
        'bannerTableCtrl','resultsService', 'ordinalSuffixFilter','tableResultsKeyFilter',
        'camelCaseFilter', 'utilitiesService','individualScoreService',
        'validateDataService', 'roasterScoreService', 'populateTableService']);

    //Handles viewing of pages for single page app//
    cupOfExcellenceApp.config(function ($routeProvider) {
        $routeProvider

        //// register googleMaps api
        //    singlePageApp.registerCtrl

        // route for the home page
            .when('/', {
                templateUrl: './home.html'
            })

            // route for the about page
            .when('/results', {
                templateUrl: './results.html'
            })

            // route for the contact page
            .when('/map', {
                templateUrl: './map.html'
            });
    });

})();