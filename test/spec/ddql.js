function Model(name) {
	var model = this;

	model.name = name;
	model.online = '2014-09-13';
	model.offline = '2014-10-13';
	model.enabled = 0;
}

describe('DDQL', function() {
	var daan   = new Model('daan'),
		paul   = new Model('paul'),
		rogier = new Model('rogier');

	it('should return false when query contains no properties',  function() {
		expect(DDQL(daan, 'test daan')).toBe(false);
		expect(DDQL(daan, 'nam daan')).toBe(false);
	});

	it('should return a boolean when searching for full text',  function() {
		expect(DDQL(daan, 'name daan')).toBe(true);
		expect(DDQL(daan, 'name da')).toBe(false);
	});

	describe('contains', function() {
		it('should return a boolean when searching for partial text',  function() {
			expect(DDQL(daan, 'name contains daan')).toBe(true);
			expect(DDQL(daan, 'online contains 2014')).toBe(true);
			expect(DDQL(daan, 'name contains aan')).toBe(true);
			expect(DDQL(daan, 'daan contains aan')).toBe(false);
			expect(DDQL(daan, 'name contains ben')).toBe(false);
		});

		it ('should filter a list of models', function() {
			expect([daan, paul, rogier].filter(function(model) {
				return DDQL(model, 'name contains a');
			}).length).toEqual(2);
		});
	});

	describe('>, <, <=, >=', function() {
		it('should handle dates', function() {
			expect(DDQL(daan, 'online < 2014-10-14')).toBe(true);
		});

		it('should handle partial dates', function() {
			expect(DDQL(daan, 'online < 2014-10')).toBe(true);
		});

		it('should handle date ranges', function() {
			expect(DDQL(daan, 'online < 2014-10-14 offline > 2014-09-14')).toBe(true);
			expect(DDQL(daan, 'online < 2014-10-14 offline >= 2014-10-13')).toBe(true);
		});
	});

	describe('boolean', function() {
		it('should handle booleans', function() {
			expect(DDQL(daan, 'enabled')).toBe(false);
			expect(DDQL(daan, 'enabled 0')).toBe(true);
		});
	});
});
