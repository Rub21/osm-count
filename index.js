var fs = require('fs');
var osmium = require('osmium');
var turf = require('turf');
var argv = require('optimist').argv;
var _ = require('underscore');
var table = require('markdown-table');
var osmfile = argv.osmfile;
var counter = require("./osmobjects");
var mt = require("./methods");

var reader = new osmium.Reader(osmfile);
var location_handler = new osmium.LocationHandler();
var handler = new osmium.Handler();

handler.on('node', function(node) {
	//count users
	counter = mt.count_per_user(node, counter);
	//count nodes
	counter = mt.count_objs(node, counter);

});

handler.on('way', function(way) {
	//count users
	counter = mt.count_per_user(way, counter);
	counter = mt.count_objs(way, counter);
	//highways
	if (way.tags().highway !== undefined) {
		counter.highways.dist_total += mt.distance_way(way);
		counter.highways.total += 1;
		//count num of ways
		if (way.version === 1) {
			counter.highways.dist_v1 += mt.distance_way(way);
			counter.highways.v1 += 1;
		} else {
			counter.highways.dist_vx += mt.distance_way(way);
			counter.highways.vx += 1;
		}
	}
	//buildings
	if (way.tags().building !== undefined) {
		counter.buildings.total += 1;
		//count num of buildings
		if (way.version === 1) {
			counter.buildings.v1 += 1;
		} else {
			counter.buildings.vx += 1;
		}
	}
});
handler.on('relation', function(relation) {
	//count users
	counter = mt.count_per_user(relation, counter);
	counter = mt.count_objs(relation, counter);
});


handler.on('done', function() {
	var users = _.sortBy(counter.users, function(v, k) {
		return -(v.total_obj);
	});
	var header = "User | Num OSM Objects | Num Changeset | Num nodes V1 | Num nodes Vx | Num ways V1| Num ways Vx | Num relation V1 | Num relation Vx \n ---|---|---|---|---|---|---|---|--- \n";
	fs.writeFile("users.md", header, function(err) {});
	var users = _.sortBy(users, function(v, k) {
		var text = v.user + '|' + v.total_obj + '|' + v.changeset.length + '|' + v.osm_nodevx + '|' + v.osm_nodev1 + '|' + v.osm_wayv1 + '|' + v.osm_wayvx + '|' + v.osm_relationv1 + '|' + v.osm_relationvx + '\n';
		fs.appendFile('users.md', text);
	});

	//for now just print the mails of roads
	console.log("=== Nodes");
	console.log(counter.nodes);
	console.log("=== Ways");
	console.log(counter.ways);
	console.log("=== Relations");
	console.log(counter.relations);
	console.log("=== Highways");
	console.log(counter.highways);
	console.log("=== Buildngs");
	console.log(counter.buildings);

});

osmium.apply(reader, location_handler, handler);