(function() {
    var app = angular.module('individualScoreService', ['utilitiesService', 'validateDataService']);

    app.factory('individualScores', ['utilities','validateData', function (utilities, validateData) {
        var service = {};

        service.getScores = function(response) {
            var myData = response.data;

            //initialize array for scores //
            var indivScores = [];

            //iterate through people //
            for (var i = 0; i < myData.length; i++) {

                //validate data to ensure that individual object contains desired information //
                //ensure that property contains numeric answer
                if (validateData.validateData(myData[i], 'individualScores')) {

                    //define individuals array as variable
                    var individual = myData[i];

                    //define name of individual using JSON parser
                    var name = individual['name'];
                    var roaster = individual['roaster'];

                    //initialize score variable
                    var score = 0;

                    //define score properties to iterate through
                    var desiredProps = ["aroma","acidity", "mouthFeel", "flavour", "aftertaste","cupperScore"];

                    //iterate through desired properties using JSON parser and add to overall score
                    for (var j = 0; j < desiredProps.length; j++) {
                        var prop = desiredProps[j];

                        //ensure property being added is a number
                        if (utilities.checkNumber(individual[prop])) {
                            score += individual[prop];
                        }
                    }

                    //only add 50 to score if score > 0. Prevents unscored coffee from displaying as score = 50
                    if (score > 0) {
                        indivScores.push({
                            name: name,
                            roaster: roaster,
                            score: score + 50
                        });
                    }
                    //defining score as null prevents it from affecting roaster score average.
                    else {
                        indivScores.push({
                            name: name,
                            roaster: roaster,
                            score: null
                        });
                    }
                }
            }

            return indivScores;
        };

        return service;

    }]);


})();