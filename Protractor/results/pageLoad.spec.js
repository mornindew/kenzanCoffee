describe('load page', function() {
	beforeEach( function() {
		browser.get('http://localhost:63342/CupOfExcellence/htmlPartials/index.html#/')

	});

	it('should load home page', function() {
		var header = element.all(by.css(' .contentHeading'));

		header.get(0).getText().then( function(text) {
			expect(text).toMatch('What is Cup Of Excellence?')
		});

		header.get(1).getText().then( function(text) {
			expect(text).toMatch("How Do We Rate Our Coffee's?")
		});
	});

	it('should load results page', function() {
		var resultsPage = element(by.linkText('Results'))

		resultsPage.click()

		browser.waitForAngular();

		var bannerHeader = element.all(by.css(' .contentHeading'));

		bannerHeader.first().getText().then( function(text) {
			expect(text).toMatch('And The Winner...')
		});

		var resultsTableHeader = element(by.binding('vm.tableHeading'));

		resultsTableHeader.getText().then( function(text) {
			expect(text).toMatch('Results')
		});
	});

	it('should load map page', function() {
		var mapPage = element(by.linkText('Find the Coffee'))

		mapPage.click()

		browser.waitForAngular();

		var map = element(by.id('map'));

		expect(map.isPresent()).toBe(true);
	});

});