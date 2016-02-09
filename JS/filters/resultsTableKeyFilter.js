(function() {
    var app = angular.module('tableResultsKeyFilter',[]);

    app.filter('tableResultsKey', function() {

        var comRegExp =  (/Com/g);

        return function comToComments(str) {

            if (!!str) {
                return str
                    .replace(comRegExp, 'Comments');
            }
            else {
                return "";
            }
        }
    });

})();