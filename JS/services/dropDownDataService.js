(function() {
var app = angular.module('dropDownDataService',[]);

app.service('dropDownData', ['$http', function ($http) {
    var vm = this;

    vm.getData = function(value) {
            return $http.get('../data/' + value + 'Names.json')
                .success( function(callback) {
                    return callback.data
                })
                .error ( function(error) {
                    console.log('error returning data: ' + error);
                })
        };

}]);
})();