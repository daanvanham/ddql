function DDQL(model, query) {
	var parts    = query.split(' '),
		keywords = {
			'contains': function(a, b) {
				var match = a.match(new RegExp(b));

				if (!match || (match && match.length === 0))
					return false;
				return true;
			},
			'<': function(a, b) {
				return a < b;
			},
			'>': function(a, b) {
				return a > b;
			},
			'>=': function(a, b) {
				return a > b || a == b;
			}
		},
		next, afterNext, index, p;


	if (!new RegExp('(' + Object.keys(model).join('|') + ')').test(query))
		return false;

	for (p in model) {
		index = parts.indexOf(p);

		if (index !== -1) {
			next = parts[index + 1];
			afterNext = parts[index + 2];

			if ((!(next in keywords) && model[p] != next) ||
				(next in keywords && !(afterNext in keywords) && !(afterNext in model) && !keywords[next].apply(null, [model[p], afterNext])))
				return false;
		}
	}

	return true;
}
