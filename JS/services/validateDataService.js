(function() {
    var app = angular.module('validateDataService', []);

    app.factory('validateData', function () {
        var service = {};

        service.validateData = function(obj, functionName) {


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

        };

        return service;

    });

})();
