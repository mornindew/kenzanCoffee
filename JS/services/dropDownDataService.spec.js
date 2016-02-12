describe('dropdown data service', function() {
var dropDownData = [];
var $httpBackend;

	beforeEach(function() {

		angular.mock.module('dropDownDataService');

		angular.mock.inject(function(_dropDownData_, _$httpBackend_) {
			dropDownData = _dropDownData_;
			$httpBackend = _$httpBackend_;
		});
	})	

	it('should return data to populate the dropdown list', function() {
		var category = ['roaster','individual'];
		var response;	
		var result;

		var roasterNames = ["Boxcar Coffee Roasters",
			  "Common Wealth Coffee",
			  "Huckleberry Roasters",
			  "ink! Coffee",
			  "Middle State Coffee",
			  "Sweet Bloom Coffee Roasters"
			];
		var individualNames = [ "Marie Schmidt",
			  "Craig Martin",
			  "Justin Tomlinson",
			  "Keith Nygaard",
			  "Walter Schlosser",
			  "Alex Uribe",
			  "David Zuluaga",
			  "Doug Melvin",
			  "Govinda Tamburino",
			  "Larry Samuels"
			];

		for (var i = 0; i < category.length; i++) {
			myCategory = category[i];

			if (myCategory = 'roaster') {
				result = roasterNames;
			}
			else if (myCategory = 'individual') {
				result = individualNames;
			}

			var expectedUrl = function(myCategory) {
				return '../data/' + myCategory + 'Names.json'
			};

			$httpBackend.when('GET', expectedUrl) 
				.respond(200,result);

			var promise = dropDownData.getData(myCategory)
			promise.then(function(callback) {
				response = callback.data;
			});

			$httpBackend.flush();

			expect(response).toEqual(result)
		};

	});
it('should handle errors', function() {
		var category = ['roaster','individual'];
		var response;	

		for (var i = 0; i < category.length; i++) {
			myCategory = category[i];

			var expectedUrl = function(myCategory) {
				return '../data/' + myCategory + 'Names.json'
			};

			$httpBackend.when('GET', expectedUrl) 
				.respond(404);

			var promise = dropDownData.getData(myCategory)
			promise.then(function(callback) {
				response = callback.data;
			});
			promise.catch(function() {
				console.log('There was an error returing the dropdown data.');
				response = 'Error with dropdown data load';
			});

			$httpBackend.flush();

			expect(response).toEqual('Error with dropdown data load')
		};

	});
});