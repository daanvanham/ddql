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
console.log(a, b, a < b);
				return a < b;
			},
			'>': function(a, b) {
				return a > b;
			},
			'>=': function(a, b) {
				return a > b || a == b;
			}
		},
		next, index, p;


	if (!new RegExp('(' + Object.keys(model).join('|') + ')').test(query))
		return false;

	for (p in model) {
		index = parts.indexOf(p);

		if (index !== -1) {
			next = parts[index + 1];

			if (next in keywords && !(parts[index + 2] in keywords) && !(parts[index + 2] in model)) {
				if (!keywords[next].apply(null, [model[p], parts[index + 2]])) {
					return false;
				}
			} else {
				if (model[p] != next) {
					return false;
				}
			}
		}
	}

	return true;
}
