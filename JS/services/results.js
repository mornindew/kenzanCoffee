
(function() {
    var app = angular.module('resultsService', ['utilitiesService', 'individualScoresService']);

    app.service('results', ['$http','utilities','individualScores', function ($http, utilities, individualScores) {
        var vm = this;

        vm.getIndividualScores = function () {

            return $http.get('../data/data.json')
                .then(individualScores)
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
                            vm.individualScores = individualScores(response);
                            console.log(vm.individualScores);
                            vm.roasterScores = roasterScores(vm.individualScores, vm.roasterNames);

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

                        vm.individualScores = individualScores(callback);

                        vm.output = {};
                        vm.data = populateTable(callback, vm.individualScores, resultsCategory, resultsDesired);
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

    /*******************************************************
     FUNCTIONS
     ******************************************************/

    // //calculate individual scores//
    // function individualScores(response) {
    //     var myData = response.data;

    //     //initialize array for scores //
    //     var indivScores = [];

    //     //iterate through people //
    //     for (var i = 0; i < myData.length; i++) {

    //         //validate data to ensure that individual object contains desired information //
    //         //ensure that property contains numeric answer
    //         if (validateData(myData[i], 'individualScores')) {

    //             //define individuals array as variable
    //             var individual = myData[i];

    //             //define name of individual using JSON parser
    //             var name = individual['name'];
    //             var roaster = individual['roaster'];

    //             //initialize score variable
    //             var score = 0;

    //             //define score properties to iterate through
    //             var desiredProps = ["aroma","acidity", "mouthFeel", "flavour", "aftertaste","cupperScore"];

    //             //iterate through desired properties using JSON parser and add to overall score
    //             for (var j = 0; j < desiredProps.length; j++) {
    //                 var prop = desiredProps[j];

    //                 //ensure property being added is a number
    //                 if (utilities.checkNumber(individual[prop])) {
    //                     score += individual[prop];
    //                 }
    //             }

    //             //only add 50 to score if score > 0. Prevents unscored coffee from displaying as score = 50
    //             if (score > 0) {
    //                 indivScores.push({
    //                     name: name,
    //                     roaster: roaster,
    //                     score: score + 50
    //                 });
    //             }
    //             //defining score as null prevents it from affecting roaster score average.
    //             else {
    //                 indivScores.push({
    //                     name: name,
    //                     roaster: roaster,
    //                     score: null
    //                 });
    //             }
    //         }
    //     }

    //     return indivScores;
    // }

//**********************************************************************************************************************************//
    /* pull scores of desired roaster */
    function roasterScores(data, roasterNames) {
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
                    && validateData(myData[j],'roasterScores')
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
    }

//**********************************************************************************************************************************//
    //check if object has expected keys as a form of data validation//
    function validateData(obj, functionName) {


        //define object keys as array//
        var keys = [];
        var expectedKeys = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key)
            }
        }

        if (functionName == 'individualScores') {
            //define expected keys as array//
            expectedKeys = ["name",
                "roaster",
                "aromaCom",
                "aroma",
                "acidityCom",
                "acidity",
                "mouthFeelCom",
                "mouthFeel",
                "flavourCom",
                "flavour",
                "aftertasteCom",
                "aftertaste",
                "balance",
                "cupperScore"];
        }
        else if (functionName == 'roasterScores') {
            expectedKeys = ["name",
                "roaster",
                "score"
            ];
        }

        //define array prototype that can be used to check if two arrays equal each other by comparing value by value//
        Array.prototype.equals = function(arr) {
            //if arr is falsey then return false
            if (!arr) {
                console.log('variable is not an array');
                return false
            }

            //if lengths don't match then return false
            if(this.length != arr.length) {
                console.log('arrays have different length');
                return false
            }

            //compare item to item, if items are not equal then return false
            for (var i=0; i < this.length; i++) {
                if (this[i] != arr[i]) {
                    console.log('arrays contain different values');
                    return false
                }
            }
            //else return true!
            return true

        };

        //return whether keys are equal or not//
        return (expectedKeys.equals(keys))

    }

    //**********************************************************************************************************************************//
    function populateTable(response, individualScores, resultsCategory, resultsDesired) {
        myData = response.data;

        //initialize results array
        var results = [];

        //Get data for each object
            for (var i = 0; i < myData.length; i++) {
                //if desired result is a person
                if (resultsCategory =='individual' && resultsDesired == myData[i].name) {
                    myObject = myData[i];

                    //add individual score to the results objects
                    for (var j = 0; j<individualScores.length; j++) {
                        if(resultsDesired == individualScores[j].name &&
                            myObject.roaster == individualScores[j].roaster) {

                            myObject["score"] = individualScores[j].score;
                        }
                    }

                    //delete name for individual results category since we will not need to display it
                    delete myObject['name'];

                    //push all objects with data from that person to results array
                    results.push(myObject);
                }
                else if (resultsCategory =='roaster' && resultsDesired == myData[i].roaster) {
                    myObject = myData[i];

                    //add individual score to the results objects
                    for (j = 0; j<individualScores.length; j++) {
                        if(resultsDesired == individualScores[j].roaster &&
                            myObject.name == individualScores[j].name) {

                            myObject["score"] = individualScores[j].score;
                        }
                    }

                    delete myObject['roaster'];

                    //push all objects with data from that roaster to results array
                    results.push(myObject);

                }

            }

        //Get keys to display data with

        return results
    }
    }]);
})();


