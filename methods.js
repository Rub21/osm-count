var turf = require('turf');
var _ = require('underscore');

module.exports = {
	count_tags: function(osm, counter) {
		_.each(osm.tags(), function(val, key) {
			if (counter.tags[key] == undefined) {
				counter.tags[key] = {
					tag: key,
					total: 0,
					v1: 0,
					vx: 0
				};
			}
			counter.tags[key].total++;
			(osm.version == 1) ? counter.tags[key].v1++: counter.tags[key].vx++;
		});
	},
	count_per_user: function(osm, counter) {
		//check user
		var user = osm.user;
		if (counter.users[user] == undefined) {
			counter.users[user] = {
				user: user,
				total: 0,
				changeset: [],
				Wv1: 0,
				Wvx: 0,
				Nv1: 0,
				Nvx: 0,
				Rv1: 0,
				Rvx: 0

			};
		}
		switch (osm.type) {
			case "node":
				var node = osm;
				(node.version == 1) ? counter.users[user].Nv1++: counter.users[user].Nvx++;
				counter.users[user].changeset.push(node.changeset);
				break;
			case "way":
				var way = osm;
				(way.version == 1) ? counter.users[user].Wv1++: counter.users[user].Wvx++;
				counter.users[user].changeset.push(way.changeset);
				break;
			case "relation":
				var relation = osm;
				(relation.version == 1) ? counter.users[user].Rv1++: counter.users[user].Rvx++;
				counter.users[user].changeset.push(relation.changeset);
				break;
		}
		++counter.users[user].total;
		counter.users[user].changeset = _.uniq(counter.users[user].changeset);
	},
	count_objs: function(osm, counter) {
		switch (osm.type) {
			case "node":
				counter.nodes.type = osm.type;
				(osm.version == 1) ? counter.nodes.v1++: counter.nodes.vx++;
				counter.nodes.total++;
				break;
			case "way":
				counter.ways.type = osm.type;
				(osm.version == 1) ? counter.ways.v1++: counter.ways.vx++;
				counter.ways.total++;
				break;
			case "relation":
				counter.relations.type = osm.type;
				(osm.version == 1) ? counter.relations.v1++: counter.relations.vx++;
				counter.relations.total++;
				break;
		}
	},
	roads_distance: function(osm, counter) {
		if (osm.type === 'way') {
			var way = osm;
			var distance = 0;
			try {
				var tags = way.tags();
				if (tags.highway || tags.bridge) {
					var line = turf.linestring(way.node_coordinates().map(function(coord) {
						return [coord.lon, coord.lat];
					}));
					distance = turf.lineDistance(line, 'miles');
				}
			} catch (e) {}
			(way.version == 1) ? counter.roads_distance.v1 += distance: counter.roads_distance.vx += distance;
			counter.roads_distance.total += distance;
			counter.roads_distance.type = "miles";
		}
	}
};