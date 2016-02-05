(function() {
    var app = angular.module('ordinalSuffixFilter',[]);

    app.filter('ordinalSuffix', function() {

        return function numberSuffix(x) {
            var j = x % 10;
            var k = x % 100;
            if (j == 1 && k != 11) {
                return x + "st";
            }
            if (j == 2 && k != 12) {
                return x + "nd";
            }
            if (j == 3 && k != 13) {
                return x + "rd";
            }
            return x + "th";
        }
    });

})();