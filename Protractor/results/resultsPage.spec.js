describe('banner page', function() {
	beforeEach( function() {
		browser.get('http://localhost:63342/CupOfExcellence/htmlPartials/index.html#/results');
	});

	it('should load 6 roasters into results banner table', function() {
		var roasterResults = element.all(by.repeater('value in vm.roasterScores'));
		expect(roasterResults.count()).toBe(6); //I know that our current results table has 6 entries.
	});

	it('should load Huckleberry Roasters into results banner table', function() {
		var roasterNames = element.all(by.repeater('value in vm.roasterScores').column('name'));
		var roasters = ['Sweet Bloom', 'Huckleberry', 'Boxcar', 'ink!', 'Common Wealth', 'Middle State'];

		for (var i = 0; i < roasters.length; i++) {
		expect(roasterNames.getText()).toMatch(roasters[i]); //I know that one of the roasters should be Huckleberry.

		}
	});

	it('should load roaster scores into results banner table', function() {
		var scoreText = /[A-Za-z]\w+ [A-Za-z]\w+: /g;
		var score = [];

		var roasterScore = element.all(by.binding('value.score')).map( function(elm) {
			elm.getText().then( function(text) {
				score.push(text.replace(scoreText,"").trim());
			});
		});

		for (var i = 0; i < score.length; i++) {
			expect(typeof(score[i])).toBe('number');
		}

	});

	it('should sort results by roaster score', function() {
		element.all(by.repeater('value in vm.roasterScores').column('score')).map(function (elm) {
		    return elm.getText();
			}).then(function (scores) {
                var sortedScores = scores.slice();
                sortedScores = sortedScores.sort(function compareNumbers(a, b) {
					  if (a > b) {
							return -1;
					  } });
        expect(scores).toEqual(sortedScores);
    	});
	});

});