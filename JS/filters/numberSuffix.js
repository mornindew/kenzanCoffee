(function() {
    var app = angular.module('numberSuffixFilter',[]);

    app.filter('numberSuffix', function() {
        var stringCapitalizeRegExp =  (/(^|\b)([a-zA-Z])/g);

        return function capitalize(str) {

            if (!!str) {
                return str
                    .replace(stringCapitalizeRegExp, function (match) {
                        return match.toUpperCase();
                    })
            }
            else {
                return "";
            }
        }
    });

})();