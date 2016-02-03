(function () {
    var app = angular.module('TableResultsHeader', ['dropDownDataService']);

    app.controller('TableResultsHeaderCtrl',['dropDownData', function (dropDownData) {

        var vm = this;

        vm.resultsCategory = 'individual';
        vm.resultsDesired = null;
        var promise = dropDownData.getData(vm.resultsCategory);
        promise.then(function (callback) {
            vm.dropDownArray = callback.data;
        });
        vm.tableHeading = vm.resultsCategory + ' Results';

        //set category, null out results desired, and generate dropdown menu
        vm.setResultsCategory = function (value) {
            vm.resultsCategory = value;
            vm.resultsDesired = null;
            var promise = dropDownData.getData(value);
            promise.then(function (callback) {
                vm.dropDownArray = callback.data;
            }, function (error) {
                console.log(error)
            });
            vm.tableHeading = value + ' Results';
        };


    }]);
})();