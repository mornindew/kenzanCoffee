describe('utilities service', function() {
var utilities = {};

	beforeEach(function() {

		angular.mock.module('utilitiesService');

		angular.mock.inject(function(_utilities_) {
			utilities = _utilities_;
		});
	})	

	it('should check if data is a number', function() {

		expect(utilities.checkNumber(4)).toEqual(true);
		expect(utilities.checkNumber(null)).toEqual(false);
		expect(utilities.checkNumber("hi")).toEqual(false);
		expect(utilities.checkNumber([true,3])).toEqual(false);

	})

		it('should average only numbers in a list', function() {

		expect(utilities.average([0,5,10])).toEqual(5);
		expect(utilities.average([0,null,'hello!',true,10])).toEqual(5);
		expect(utilities.average(5)).toEqual(5);
		expect(utilities.average('me')).toEqual([]);

	})

		it('should get keys given an object', function() {

		//try simple case of two object - this is the expected format of data
		expect(utilities.getKeys([{"firstName":"marie", "age":"24"},{"name":"greg", "age":"21"}])).toEqual(["firstName","age"]);
		//try two objects with different keys - expect all unique keys to be pushed
		expect(utilities.getKeys([{"firstName":"marie", "age":"24", "hometown":"Pleasanton"},{"name":"greg", "age":"21"}])).toEqual(["firstName","age","hometown"]);
		//try an array with one object and various other data types, only keys of object should be pushed
		expect(utilities.getKeys([{"firstName":"marie", "age":"24"},45, null, true])).toEqual(["firstName","age"]);
		//try single object, not contained in array
		expect(utilities.getKeys({"firstName":"marie", "age":"24"})).toEqual(["firstName","age"]);
		//try array not containing an object
		expect(utilities.getKeys([5,'hello',null, true])).toEqual([]);
		//try single piece of data, not contained in an array
		expect(utilities.getKeys(6)).toEqual([]);

	})

});