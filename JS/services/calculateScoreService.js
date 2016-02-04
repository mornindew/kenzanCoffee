//this service will be used to generate each roasters average score for the banner table

(function() {
    //var app = angular.module('calculateScoreService',[]);
    //
    //app.service('calculateScore', ['$http', function ($http) {
    //var vm = this;

    var results = require('./../../data/data.json');
    var roasters = require('./../../data/roasterNames.json');

    var scores = {};
    var averages = [];

    for (var i = 0 ; i < roasters.length; i ++) {
        var roaster = roasters[i];
        scores[roaster] = getScores(roaster, results);

        averages[i] = average(scores[roaster]);

    }

    //}]);

    /*******************************************************
     FUNCTIONS
     ******************************************************/

    /* Define function to check if entry is a number */
    function checkNumber(x) {
        if (typeof(x)== "number") {
            return x
        }
    }

    /* average function */
    function average(list) {
        //genreate number of item in array
        var length = list.length;

        var sum = 0;
        //generate sum of array //
        for ( var i = 0; i < length; i++) {
            sum += list[i];
        }

        // return average value rounded to the tenth //
        return avg = Math.round(10*(sum/length))/10;

    }

    /* pull scores of desired roaster */
    function getScores(value, data) {
        var myData = data;

        //iterate through roasters in json file//
        for (var key in myData) {
            // check to make sure key exists
            if (myData.hasOwnProperty(key)) {
                //if key (roaster) is the roaster passed to the function then continue
                if (key == value) {
                    //define array of individuals within roaster object
                    var myArray = myData[key];
                    //initialize output array that will be filled with desired results
                    var output = [];

                    //loop through individuals objects
                    for (var i = 0; i < myArray.length; i ++) {
                        //make sure individuals objects contain expected data - slick!
                        if (validateData(myArray[i])) {
                            //make sure that property contains a number, if not do not push to output array (would mess up average function otherwise)
                            if (checkNumber(JSON.parse(myArray[i].score))) {
                                //populate output array with results!
                                output.push(JSON.parse(myArray[i].score));
                            }
                        }
                    }
                }
            }
        }
        return output
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
        var expectedKeys = ["firstName","lastName","aromaCom","aroma","acidityCom","acidity",
                            "mouthFeelCom","mouthFeel", "flavourCom","flavour","aftertasteCom",
                            "aftertaste","balance","cupperScore","score"];

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

})();

