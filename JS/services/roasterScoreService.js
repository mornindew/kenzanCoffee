(function() {
    var app = angular.module('roasterScoreService', ['utilitiesService', 'validateDataService']);

    app.factory('roasterScores', ['utilities','validateData', function (utilities, validateData) {
        var service = {};

        service.getScores = function(data, roasterNames) {
            var myData = data;
            var roasterScores = [];

            //loop through roasters using roaster names key
            for (var i = 0; i < roasterNames.length; i++) {

                //initialize output array that will be filled with desired results
                var output = [];

                //loop through individuals objects
                for (var j = 0; j < myData.length; j++) {

                    //make sure that property contains a number, if not do not push to output array (would mess up average function otherwise)
                    if (myData[j].roaster == roasterNames[i]
                        && validateData.validateData(myData[j],'roasterScores')
                        && utilities.checkNumber(myData[j].score)) {
                        //populate output array with results!
                        var score = myData[j].score;
                        output.push(score);
                    }
                }

                //average all results to get overall score
                var avg = utilities.average(output);

                //push roaster name and overall score to a results array
                roasterScores.push({
                    name: roasterNames[i],
                    score: avg
                });

            }

            return roasterScores
        };

        return service;

    }]);


})();