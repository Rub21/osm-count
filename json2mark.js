var fs = require('fs');
var _ = require('underscore');

module.exports = {
	json2table: function(name, array) {
		var sort_tags = _.sortBy(array, function(v, k) {
			return -(v.total);
		});
		var tx = '';
		_.each(sort_tags, function(val, key) {
			if (key == 0) {
				var headers = _.keys(val).join(' | ') + '\n';
				var subheader = Array.apply(null, Array(_.keys(val).length)).map(function() {
					return "---";
				}).join(' | ') + '\n';
				tx = headers + subheader;
			}
			var value = []
			_.each(_.values(val), function(v) {
				if (_.isNumber(v)) {
					value.push(cms(v).toString())
				} else {
					value.push(cms(v).toString())
				}
			});
			tx = tx + value.join(' | ') + '\n';
		});
		fs.writeFile(name + '.md', tx, function(err) {});
	}
}

function cms(num) {
	var er = /^-?[0-9]+$/;
	if (er.test(num)) {
		return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	} else {
		return num;
	}
}