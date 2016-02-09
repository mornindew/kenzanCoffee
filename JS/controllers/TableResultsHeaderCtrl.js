(function () {
    var app = angular.module('TableResultsHeader', ['dropDownDataService', 'capitalizeFilter', 'calcScoreService', 'tableResultsKeyFilter', 'camelCaseFilter']);

    app.controller('TableResultsHeaderCtrl',['dropDownData', 'calcScore', function (dropDownData, calcScore) {

        var vm = this;

        //set category, null out results desired, and generate dropdown menu
        vm.setResultsCategory = function (value) {
            vm.resultsCategory = value;
            vm.resultsDesired = "Choose Which Results to Display Above";
            var promise = dropDownData.getData(value);
            promise.then(
                function (callback) {
                vm.dropDownArray = callback.data;
            }, function (error) {
                console.log(error)
            });
            vm.tableHeading = value + ' Results';

            vm.keys = [];
            vm.data = [];
        };

        vm.setResultsCategory('individual');

        vm.tableHeading = vm.resultsCategory + ' Results';


        //Generate results table
        vm.setResultsTable = function(resultsCategory, resultsDesired) {
        var promise = calcScore.resultsTable(vm.resultsCategory,vm.resultsDesired);

        promise.then( function(callback) {
            if (callback.keys) {
                vm.keys = callback.keys;
            }
            if (callback.data) {
                vm.data = callback.data;
            }

        });
        promise.catch( function() {
            console.log('Error with loading the results table')
        })
        };


    }]);
})();