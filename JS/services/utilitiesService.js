(function() {
    var app = angular.module('utilitiesService', []);

    app.factory('utilities', function () {
        return {
            /* Define function to check if entry is a number */
            checkNumber: function(x) {
                if (typeof(x) == "number") {
                    return true
                }
                else {
                    return false
                }
            },

            /* average function */
            average: function(list) {
                //generate number of item in array
                var length = list.length;

                var sum = 0;
                //generate sum of array //
                for (var i = 0; i < length; i++) {
                    sum += list[i];
                }

                // return average value rounded to the tenth //
                return avg = Math.round(10 * (sum / length)) / 10;
            },
            //**********************************************************************************************************************************//
            getKeys: function(response) {
                myData = response;

                //initialize keys array
                var myKeys = [];

                //for each object
                for (var i = 0; i < myData.length; i++) {
                    var myObject = myData[i];
                    for (var key in myObject) {
                        if (key !== 'name') {
                            myKeys.pushIfUnique(key);
                        }
                    }
                }

                return myKeys
            }
        }
    });


Array.prototype.inArray = function(value) {
    for (var i = 0; i <this.length; i++) {
        if (value == this[i]) {
            return false
        }
    }
    return true
};

Array.prototype.pushIfUnique = function(value) {
    if (this.inArray(value)) {
        this.push(value);
    }
};

})();