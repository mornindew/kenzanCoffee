/**
 * Created by marieschmidt on 1/29/16.
 */
( function() {
var CupOfExcellenceApp = angular.module('CupOfExcellenceApp', ['ngRoute']);

    //Handles viewing of pages for single page app//
    CupOfExcellenceApp.config(function($routeProvider) {
        $routeProvider

        //// register googleMaps api
        //    singlePageApp.registerCtrl

            // route for the home page
                .when('/', {
                    templateUrl : './home.html'
                })

            // route for the about page
                .when('/results', {
                    templateUrl : './results.html',
                    controller: 'resultsController'
                })

            // route for the contact page
                .when('/map', {
                    templateUrl : './map.html'
                });
    });

    //initializes variables for results page//
    CupOfExcellenceApp.controller('resultsController', function() {
        //defines initial values for variables on the results page//
        this.resultsCategory = 'individual';

    });

    //displays individual drop down menu//
    CupOfExcellenceApp.controller('individualDropDown', [ '$http', function($http) {
        //define this to be used throughout controller
        var indivDD = this;

        //initialize individual names array//
        indivDD.individualNames = [];

        //get JSON data//
        $http.get('../data/individualNames.json')
            .success(function (data) { //if load is successful...
                indivDD.individualNames = data;

            }) //load full JSON data file
            .error(function (data, status, headers, config) { //if load is unsuccessful...
                console.log('error with data loading')
            });

    }]);

    //displays roaster drop down menu//
    CupOfExcellenceApp.controller('roasterDropDown', [ '$http', function($http) {

        //define this to be used throughout controller
        var roasterDD = this;

        //initialize roaster names array//
        roasterDD.roasterNames = [];

        $http.get('../data/roasterNames.json')
            .success(function (data) { //if load is successful...
                roasterDD.roasterNames = data;

            }) //load full JSON data file
            .error(function (data, status, headers, config) { //if load is unsuccessful...
                console.log('error with data loading')
            });

    }]);
})();