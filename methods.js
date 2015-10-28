var turf = require('turf');
var _ = require('underscore');

var preserve_type = {
	"motorway": true,
	"primary": true,
	"secondary": true,
	"tertiary": true,
	"trunk": true,
	"residential": true,
	"unclassified": true,
	"service": true
};

module.exports = {
	count_tags: function(osm, counter) {
		_.each(osm.tags(), function(val, key) {
			//console.log(val + "--" + key);
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
				osm_nodevx: 0,
				osm_nodev1: 0,
				osm_wayv1: 0,
				osm_wayvx: 0,
				osm_relationv1: 0,
				osm_relationvx: 0,
				changeset: []
			};
		};

		switch (osm.type) {
			case "node":
				var node = osm;
				if (node.version === 1) {
					++counter.users[node.user].osm_nodev1;
					counter.users[node.user].changeset.push(node.changeset);
				} else {
					++counter.users[node.user].osm_nodevx;
					counter.users[node.user].changeset.push(node.changeset);
				}
				break;

			case "way":
				var way = osm;
				if (way.version === 1) {
					++counter.users[user].osm_wayv1;
					counter.users[user].changeset.push(way.changeset);
				} else {
					++counter.users[user].osm_wayvx;
					counter.users[user].changeset.push(way.changeset);
				}
				break;
			case "relation":
				var relation = osm;
				if (relation.version === 1) {
					++counter.users[user].osm_relationv1;
					counter.users[user].changeset.push(relation.changeset);
				} else {
					++counter.users[user].osm_relationvx;
					counter.users[user].changeset.push(relation.changeset);
				}
				break;
		}
		++counter.users[user].total;
		counter.users[user].changeset = _.uniq(counter.users[user].changeset);
		return counter;
	},
	count_objs: function(osm, counter) {
		switch (osm.type) {
			case "node":
				var node = osm;
				if (node.version === 1) {
					++counter.nodes.v1;
				} else {
					++counter.nodes.vx;
				}
				++counter.nodes.total;
				break;

			case "way":
				var way = osm;
				if (way.version === 1) {
					++counter.ways.v1;
				} else {
					++counter.ways.vx;
				}
				++counter.ways.total;
				break;
			case "relation":
				var relation = osm;
				if (relation.version === 1) {
					++counter.relations.v1;
				} else {
					++counter.relations.vx;
				}
				++counter.relations.total;
				break;
		}
		return counter;
	},
	roads_distance: function(osm, counter) {
		if (osm.type === 'way') {
			var way = osm;
			var distance = 0;
			try {
				var tags = way.tags()
				if (tags.highway || tags.bridge) {
					var line = turf.linestring(way.node_coordinates().map(function(coord) {
						return [coord.lon, coord.lat]
					}))
					distance = turf.lineDistance(line, 'miles')
				}
			} catch (e) {}
			(way.version == 1) ? counter.roads_distance.v1 += distance: counter.roads_distance.vx += distance;
			counter.roads_distance.total += distance
		}
		//return counter;
	}

}