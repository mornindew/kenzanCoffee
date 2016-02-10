(function() {
    var app = angular.module('utilitiesService', []);

    app.factory('utilities', function () {
        var service = {};

        service.checkNumber = function(x) {
            return (typeof(x) == "number");
        };


        service.average = function(list) {
            //initialize list for only numbers
            numberList = [];

            //If item passed to function is an array with more than one object
            if (Array.isArray(list)) {
                //loop through all items in list
                for(var i = 0; i < list.length; i++) {
                    //if item is a number..
                    if(service.checkNumber(list[i])) {
                        //push to list for only numbers
                        numberList.push(list[i]);
                    }
                }
            }
            else if (service.checkNumber(list)) {
                //push to list for only numbers
                numberList.push(list);
            }
            else {
                return numberList
            }

            //get number of items in numbers array
            var length = numberList.length;

            var sum = 0;
            //generate sum of array //
            for (var i = 0; i < length; i++) {
                sum += numberList[i];
            }

            // return average value rounded to the tenth //
            return avg = Math.round(10 * (sum / length)) / 10;
        };

        service.getKeys = function(response) {
            myData = response;

            //initialize keys array
            var myKeys = [];

            //define array prototypes
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

            //for each object
            if(Array.isArray(myData)) {
                for (var i = 0; i < myData.length; i++) {
                    var myObject = myData[i];
                    if(typeof(myObject) == 'object') {
                        for (var key in myObject) {
                            if (key !== 'name') {
                                myKeys.pushIfUnique(key);
                            }
                        }
                    }
                }
            }
            else {
                if (typeof(myData) == 'object') {
                    myObject = myData
                    for (var key in myObject) {
                        if (key !== 'name') {
                            myKeys.pushIfUnique(key);
                        }
                    }
                }
            }

            return myKeys
        };

        return service;

    });


})();