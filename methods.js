var turf = require('turf');
var _ = require('underscore');

module.exports = {
	distance_way: function(way) {
		//distance just for roads
		if (way.tags().highway !== undefined) {
			var line = {
				"type": "Feature",
				"properties": {},
				"geometry": way.geojson()
			};
			var length = turf.lineDistance(line, 'miles');
			return length;
		} else {
			return 0;
		}
	},
	area_building: function(way) {
		//area buildings
		var polygon = {
			"type": "FeatureCollection",
			"features": [{
				"type": "Feature",
				"properties": {},
				"geometry": way.geojson()
			}]
		};
		var area = turf.area(polygon);

		return area;
	}
}