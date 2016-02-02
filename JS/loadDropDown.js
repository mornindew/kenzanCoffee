angular.module("table", [])

.controller('loadDropDown', function($scope, $http) {

    //load results from JSON file
    $http.get('./JS/data.json')
        .success(function (data) { //if load is successful...
            $scope.results = data;

            $scope.getNames($scope.results);

        }) //load full JSON data file
        .error(function (data, status, headers, config) { //if load is unsuccessful...
            console.log('error with data loading')
        });


    //********* Parse Data into Arrays for Display in DropDown **********//
    //Initialize arrays to load specific data into

    // Create array prototype to add value to array only if it is unique, will be used to create
    // array of individual names
    Array.prototype.pushifUnique = function (currentElement) {
        if (!this.some(function (arrVal) {
                return currentElement == arrVal;
            })) {
            this.push(currentElement);
        }
    };

    $scope.getNames = function(data) {
        $scope.roasterNames = [];
        $scope.individualNames = [];

        for (var roaster in $scope.results) { //view results at the roaster level
            if ($scope.results.hasOwnProperty(roaster)) { //ensure property exists
                $scope.roasterNames.push(roaster); //push roaster name to array of names

                $scope.roasterResults = $scope.results[roaster]; //define array of individuals objects as a scope variable

                $scope.roasterResults.forEach(function (individual) { //loop through array of objects to pull individuals names
                    $scope.individualNames.pushifUnique(individual.firstname); //pull first names and only push if they are unique
                });
            }
        }
    }
    });


