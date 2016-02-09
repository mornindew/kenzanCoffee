(function() {
    var app = angular.module('camelCaseFilter',[]);

    app.filter('camelCase', function() {

        var camelCaseRegExp =  (/([A-Z])/g);

        return function camelCase(str) {

            if (!!str) {
                return str
                    .replace(camelCaseRegExp, ' $1');
            }
            else {
                return "";
            }
        }
    });

})();