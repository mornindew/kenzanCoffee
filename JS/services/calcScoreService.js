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

            return $http.get('../data/data.json')
                .then(function (response) {
                    vm.individualScores = individualScores(response);

                    vm.roasterScores = roasterScores(vm.individualScores);

                    return vm.roasterScores

                })
                .catch(getDataFailed)

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

    /* pull scores of desired roaster */
    function roasterScores(data) {
        var myData = data;
        var roasterScores = [];

        //iterate through roasters in json file//
        for (var key in myData) {
            // check to make sure key exists
            if (myData.hasOwnProperty(key)) {
                //define roaster name
                var name = key;
                //define array of individuals within roaster object
                var myArray = myData[key];
                //initialize output array that will be filled with desired results
                var output = [];

                //loop through individuals objects
                for (var i = 0; i < myArray.length -1 ; i++) {
                    //make sure individuals objects contain expected data - slick!
                    //make sure that property contains a number, if not do not push to output array (would mess up average function otherwise)
                    if (checkNumber(myArray[i].score)) {
                        //populate output array with results!
                        var score = myArray[i].score;
                        output.push(score);
                    }
                    else {
                        console.log(checkNumber(myArray[i].score));
                        console.log(validateData(myArray[i]));
                    }
                }
            }
            //average all results to get overall score
            var avg = average(output);

            //push roaster name and overall score to a results array
            roasterScores.push({
                name: name,
                score: avg
            })
        }

    return roasterScores
    }

    //check if object has expected keys as a form of data validation//
    function validateData(obj) {

        //define object keys as array//
        var keys = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key)
            }
        }

        //define expected keys as array//
        var expectedKeys = ["firstName",
            "lastName",
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

        //define array prototype that can be used to check if two arrays equal each other by comparing value by value//
        Array.prototype.equals = function(arr) {
            //if arr is falsey (check out the lingo) then return false
            if (!arr) {
                return false
            }

            //if lengths don't match then return false
            if(this.length != arr.length) {
                return false
            }

            //compare item to item, if items are not equal then return false
            for (var i=0; i < this.length; i++) {
                if (this[i] != arr[i]) {
                    return false
                }
            }
            //else return true!
            return true

        };

        //return whether keys are equal or not//
        return (expectedKeys.equals(keys))

    }

    //calculate individual scores//
    function individualScores(response) {
        var myData = response.data;
        //intitialize individual scores object//
        var indivScores = {};

        //iterate through roasters //
        for (var key in myData) {
            //ensure key exists
            if (myData.hasOwnProperty(key)) {
                //define array of individuals to iterate through
                var myArray = myData[key];

                //initialize array for roaster within new individual scores object //
                indivScores[key] = [];

                //iterate through people //
                for (var i = 0; i < myArray.length; i++) {

                    //validate data to ensure that individual object contains desired information //
                    //ensure that property contains numeric answer
                    if (validateData(myArray[i]) && checkNumber(JSON.parse(myArray[i].score))) {

                            //define individuals array as variable
                            var individual = myArray[i];

                            //define name of individual using JSON parser
                            var name = individual['firstName'] + " " +individual['lastName'];

                            //initialize score variable
                            var score = 0;

                            //define score properties to iterate through
                            var desiredProps = ["aroma","acidity", "mouthFeel", "flavour", "aftertaste","cupperScore"];

                            //iterate through desired properties using JSON parser and add to overall score
                            for (var j = 0; j < desiredProps.length; j++) {
                                var prop = desiredProps[j];
                                score += individual[prop];
                            }

                            var thisRoasterScores = indivScores[key];
                            thisRoasterScores.push({
                                name: name,
                                score: score + 50
                            });

                    }
                }


            }
        }

        return indivScores;
    }

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

