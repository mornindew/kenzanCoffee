/**
 * Created by marieschmidt on 1/27/16.
 */
var results = require('./../data/data.json');

/*******************************************************
 FUNCTIONS
 ******************************************************/

/* Define function to check if entry is a number */
function checkNumber(x) {
    if (typeof(x)== "number") {
        return x
    }
    else {
        return 0
    }
}

/* average function */
function average(list) {
    var sum = 0;
    var length = list.length;

    for ( var i = 0; i < length; i++) {
        sum += list[i];
    }

    var avg = sum/length;
    return avg
}


/*******************************************************
 CALCULATE SCORES AND AVERAGES
 ******************************************************/

//define loop counter variable x//
var x = 0;

// create results object to hold all scores //
roasterResults = {
    aromaTotal: [],
    acidityTotal: [],
    mouthfeelTotal: [],
    flavourTotal: [],
    aftertasteTotal: [],
    cupperScoreTotal: [],
    scoreTotal: []
};
//define object where averages will be held//
roasterAverage = {
    aromaAvg: 0,
    acidityAvg: 0,
    mouthfeelAvg: 0,
    flavourAvg: 0,
    aftertasteAvg: 0,
    cupperScoreAvg: 0,
    scoreAvg: 0
};

// loop through roasters & individuals
for (var key in results) {
    //Define roaster array for the loop as roasterName//
    var roasterName = results[key];

    // Grab text name of roaster //
    var names = Object.keys(results);
    roaster = names[x];

    //calculate individual scores for each user for given roaster //
    //push scores to results object//
    for (var prop = 0; prop < roasterName.length ; prop++) {
        var indivName = (roasterName[prop]);

        var aroma = checkNumber(indivName["aroma"]);
        roasterResults.aromaTotal.push(aroma);

        var acidity = checkNumber(indivName["acidity"]);
        roasterResults.acidityTotal.push(acidity);

        var mouthfeel = checkNumber(indivName["mouthfeel"]);
        roasterResults.mouthfeelTotal.push(mouthfeel);

        var flavour = checkNumber(indivName["flavour"]);
        roasterResults.flavourTotal.push(flavour);

        var aftertaste = checkNumber(indivName["aftertaste"]);
        roasterResults.aftertasteTotal.push(aftertaste);

        var cupperScore = checkNumber(indivName["cupperScore"]);
        roasterResults.cupperScoreTotal.push(cupperScore);

        indivName["score"] = aroma + acidity + mouthfeel + flavour + aftertaste + cupperScore + 50;
        roasterResults.scoreTotal.push(indivName["score"])
    }

    // calculate average of roasters score for overall ranking //
    //calculate averages//
    roasterAverage.aromaAvg = average(roasterResults.aromaTotal);
    roasterAverage.acidityAvg = average(roasterResults.acidityTotal);
    roasterAverage.mouthfeelAvg = average(roasterResults.mouthfeelTotal);
    roasterAverage.flavourAvg = average(roasterResults.flavourTotal);
    roasterAverage.aftertasteAvg = average(roasterResults.aftertasteTotal);
    roasterAverage.cupperScoreAvg = average(roasterResults.cupperScoreTotal);
    roasterAverage.scoreAvg = average(roasterResults.scoreTotal);

    console.log(roaster );
    console.log(roasterAverage);

    // increase x (loop counter) by one for the new loop //
    x += 1;
}






