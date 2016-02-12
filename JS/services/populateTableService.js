(function() {
    var app = angular.module('populateTableService', []);

    app.factory('populateTable', function () {
        var service = {};

        service.populateTable = function(response, individualScores, resultsCategory, resultsDesired) {
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
        };

        return service;

    });

})();