/**
 * Created by marieschmidt on 1/29/16.
 */

var CupOfExcellenceApp = angular.module('CupOfExcellenceApp', ['ngRoute']);

CupOfExcellenceApp.config(function($routeProvider) {
        $routeProvider

        //// register googleMaps api
        //    singlePageApp.registerCntl

            // route for the home page
                .when('/', {
                    templateUrl : './home.html',
                    controller  : 'aboutCtrl'
                })

            // route for the about page
                .when('/results', {
                    templateUrl : './results.html',
                    controller  : 'resultsCtrl'
                })

            // route for the contact page
                .when('/map', {
                    templateUrl : './map.html',
                    controller  : 'mapCtrl'
                });
    });

CupOfExcellenceApp.controller('aboutCtrl', function($scope) {


});

CupOfExcellenceApp.controller('resultsCtrl', function($scope) {


});

CupOfExcellenceApp.controller('mapCtrl', function($scope) {


});

