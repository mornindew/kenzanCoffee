(function () {
    var app = angular.module('GetScoresTestCtrl', ['calcScoreService', 'dropDownDataService']);

    app.controller('GetScoresTestCtrl',['calcScore','dropDownData', function (calcScore, dropDownData) {

        var vm = this;

        var promise = calcScore.getRoasterScore();

        promise.then(
            function (callback) {
                vm.roasterScores = callback;
                vm.rank = [];

                for (var i =0; i < vm.roasterScores.length; i++) {
                    vm.rank.push(i + 1);
                }

            }, function (error) {
                console.log(error)
            });

    }]);
})();
