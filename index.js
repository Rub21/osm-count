var fs = require('fs');
var osmium = require('osmium');
var turf = require('turf');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore');
var mt = require("./methods");
var json2mark = require("./json2mark");

var osmobj = function() {
	return {
		type: null,
		total: 0,
		v1: 0,
		vx: 0,
	}
};

var counter = {
	nodes: new osmobj(),
	ways: new osmobj(),
	relations: new osmobj(),
	users: {},
	tags: {},
	roads_distance: new osmobj()
};


var users = []
if (argv.fileusers !== undefined) {
	fs.readFile(argv.fileusers, 'utf8', function(err, data) {
		if (err) throw err;
		users = data.replace('@', '').split(',');
	});
}

var osmfile = argv.osmfile;
var file = new osmium.File(osmfile);
var location_handler = new osmium.LocationHandler();
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

stream.on('data', function(osm) {
	if (users.length > 0) {
		if ( && users.indexOf(osm.user) > 0) {
			mt.count_per_user(osm, counter);
			mt.count_objs(osm, counter);
			if (_.size(osm.tags()) > 0) {
				mt.count_tags(osm, counter);
			}
			mt.roads_distance(osm, counter);
		}
	} else {
		mt.count_per_user(osm, counter);
		mt.count_objs(osm, counter);
		if (_.size(osm.tags()) > 0) {
			mt.count_tags(osm, counter);
		}
		mt.roads_distance(osm, counter);
	}
});

stream.on('end', function() {
	_.each(counter.users, function(v, k) {
		v.changeset = v.changeset.length;
		return v;
	});
	json2mark.json2table('osm_objects', [counter.ways, counter.nodes, counter.relations]);
	json2mark.json2table('users', counter.users)
	json2mark.json2table('tags', counter.tags);
	json2mark.json2table('roads-distance', [counter.roads_distance]);
});