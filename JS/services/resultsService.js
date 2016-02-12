
(function() {
    var app = angular.module('resultsService', ['utilitiesService', 'individualScoreService', 'roasterScoreService','populateTableService']);

    app.service('results', ['$http','utilities','individualScores', 'roasterScores','populateTable', function ($http, utilities, individualScores, roasterScores, populateTable) {
        var vm = this;

        vm.getIndividualScores = function () {

            return $http.get('../data/data.json')
                .then(function(callback) {
                    return individualScores.getScores(callback);
                })
                .catch(function() {
                    console.log('There was an error with returning data when calculating individual score');
                    return 'Error with data load for individual scores';
                });

        };

        vm.getRoasterScores = function () {
            return $http.get('../data/roasterNames.json')
                .then( function(callback) {
                    vm.roasterNames = callback.data;

                    return $http.get('../data/data.json')
                        .then(function (response) {
                            vm.individualScores = individualScores.getScores(response);
                            console.log(vm.individualScores);
                            vm.roasterScores = roasterScores.getScores(vm.individualScores, vm.roasterNames);

                            return vm.roasterScores

                        })
                        .catch( function() {
                            console.log('There was an error with returning data when calculating roaster scores')
                            return 'Error with data load for roaster scores';
                        });
                })
                .catch ( function() {
                    console.log('There was an error with returning roaster names data when calculating roaster scores')
                    return 'Error with data load for roaster names';
                })


        };

        vm.resultsTable = function(resultsCategory, resultsDesired) {

            return $http.get('../data/data.json')
                .then( function(callback) {

                        vm.individualScores = individualScores.getScores(callback);

                        vm.output = {};
                        vm.data = populateTable.populateTable(callback, vm.individualScores, resultsCategory, resultsDesired);
                        vm.keys = utilities.getKeys(vm.data);
                        return output = {
                            keys: vm.keys,
                            data: vm.data
                        }
                })
                .catch( function() {
                    console.log('There was an error with returning data when populating results table');
                    return 'Error with data load for results table';
                });



        };

    }]);
})();



