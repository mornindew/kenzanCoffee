//this service will be used to generate each roasters average score for the banner table

(function() {
    var app = angular.module('calcScoreService', []);

    app.service('calcScore', ['$http', function ($http) {
        var vm = this;

        vm.getIndividualScores = function () {

            return $http.get('../data/data.json')
                .then(individualScores)
                .catch(getDataFailed);

        };

        vm.getRoasterScore = function () {
            return $http.get('../data/roasterNames.json')
                .then( function(callback) {
                    vm.roasterNames = callback.data;
                    console.log(vm.roasterNames);

                    return $http.get('../data/data.json')
                        .then(function (response) {
                            vm.individualScores = individualScores(response);
                            console.log(vm.individualScores);

                            vm.roasterScores = roasterScores(vm.individualScores, vm.roasterNames);

                            return vm.roasterScores

                        })
                        .catch(getDataFailed)
                })
                .catch ( function() {
                    console.log('Error returning roaster names key');
                })


        }

    }]);

    /*******************************************************
     FUNCTIONS
     ******************************************************/

    /* Define function to check if entry is a number */
    function checkNumber(x) {
        if (typeof(x) == "number") {
            return true
        }
        else {
            return false
        }
    }

//**********************************************************************************************************************************//
    /* average function */
    function average(list) {
        //genreate number of item in array
        var length = list.length;

        var sum = 0;
        //generate sum of array //
        for (var i = 0; i < length; i++) {
            sum += list[i];
        }

        // return average value rounded to the tenth //
        return avg = Math.round(10 * (sum / length)) / 10;

    }

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
                    && checkNumber(myData[j].score)) {
                    //populate output array with results!
                    var score = myData[j].score;
                    output.push(score);
                }
            }

            //average all results to get overall score
            var avg = average(output);

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
            expectedKeys = ["firstName",
                "lastName",
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
                "cupperScore",
                "score"];
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
    //calculate individual scores//
    function individualScores(response) {
        var myData = response.data;

                //initialize array for scores //
                var indivScores = [];

                //iterate through people //
                for (var i = 0; i < myData.length; i++) {

                    //validate data to ensure that individual object contains desired information //
                    //ensure that property contains numeric answer
                    if (validateData(myData[i], 'individualScores') && checkNumber(JSON.parse(myData[i].score))) {

                            //define individuals array as variable
                            var individual = myData[i];

                            //define name of individual using JSON parser
                            var name = individual['firstName'] + " " +individual['lastName'];
                            var roaster = individual['roaster'];

                            //initialize score variable
                            var score = 0;

                            //define score properties to iterate through
                            var desiredProps = ["aroma","acidity", "mouthFeel", "flavour", "aftertaste","cupperScore"];

                            //iterate through desired properties using JSON parser and add to overall score
                            for (var j = 0; j < desiredProps.length; j++) {
                                var prop = desiredProps[j];
                                score += individual[prop];
                            }

                            indivScores.push({
                                name: name,
                                roaster: roaster,
                                score: score + 50
                            });

                    }
                }

        return indivScores;
    }

//**********************************************************************************************************************************//
    function getDataFailed(e) {
        var newMessage = 'XHR Failed for getData';
        if (e.data && e.data.description) {
            newMessage = newMessage + '\n' + e.data.description;
        }
        e.data.description = newMessage;
        logger.error(newMessage);
        return $q.reject(e);
    }
})();

