(function () {
    var app = angular.module('GetScoresCtrl', ['calcScoreService', 'dropDownDataService', 'ordinalSuffixFilter']);

    app.controller('GetScoresCtrl',['calcScore','dropDownData', function (calcScore, dropDownData) {

        var vm = this;

        var promise = calcScore.getRoasterScores();

        promise.then(
            function (callback) {
                vm.roasterScores = callback;
                vm.rank = [];

                for (var i =0; i < vm.roasterScores.length; i++) {
                    vm.rank.push(i + 1);
                }

            });
        promise.catch(
            function () {
                console.log('There was an error with the data transfer of roaster scores')
            });

    }]);
})();

