/**
 * Created by marieschmidt on 1/21/16.
 */

(function() {

    var app = angular.module('individualResults', []);

    app.controller('resultsController', function() {
        this.results = Marie;
    });

//This functions calculates the total score of the roast for the cupping//
    totalScore = [0, 0, 0, 0, 0, 0];
    var calculateScore = function (acidity, mouthfeel, flavour, aftertaste, balance) {
        for (i = 0; i < acidity.length; i++) {

            totalScore[i] = (acidity[i] + mouthfeel[i] + flavour[i] +
                aftertaste[i] + balance[i]) + 50;
        }
        return totalScore;
    };

//this is an example data entry for me, Marie!//
    var individuals = {
        roasters: ['Marie', 'Boxcar Coffee Roasters', 'Corvus Coffee Roasters', 'Huckleberry Coffee Roasters',
            'ink! Coffee Company', 'Middle State Coffee Roasters', 'Sweet Bloom Coffee Roasters'],
        aromaComments: ['a', 'b', 'c', 'd', 'e', 'f'],
        acidityValue: [1, 2, 3, 4, 5, 6],
        acidityDescription: ['a', 'b', 'c', 'd', 'e', 'f'],
        mouthfeelValue: [1, 2, 3, 4, 5, 6],
        mouthfeelDescription: ['a', 'b', 'c', 'd', 'e', 'f'],
        flavourValue: [1, 2, 3, 4, 5, 6],
        flavourDescription: ['a', 'b', 'c', 'd', 'e', 'f'],
        aftertasteValue: [1, 2, 3, 4, 5, 6],
        aftertasteDescription: ['a', 'b', 'c', 'd', 'e', 'f'],
        balanceValue: [1, 2, 3, 4, 5, 6],
        balanceDescription: ['a', 'b', 'c', 'd', 'e', 'f'],
        score: calculateScore(this.acidityValue, this.mouthfeelValue, this.flavourValue, this.aftertasteValue, this.balanceValue)
    };

});