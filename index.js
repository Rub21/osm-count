var fs = require('fs');
var osmium = require('osmium');
var turf = require('turf');
var argv = require('optimist').argv;
var _ = require('underscore');
var osmfile = argv.osmfile;
var osmb = require("./osmobjects");
var mt = require("./methods");


var reader = new osmium.Reader(osmfile);
var location_handler = new osmium.LocationHandler();
var handler = new osmium.Handler();

// handler.on('node', function(node) {
// 	//       console.log(node)
// });

handler.on('way', function(way) {
	//highways
	if (way.tags().highway !== undefined) {
		osmb.highways.dist_total += mt.distance_way(way);
		osmb.highways.total += 1;
		//count num of ways
		if (way.version === 1) {
			osmb.highways.dist_v1 += mt.distance_way(way);
			osmb.highways.v1 += 1;
		} else {
			osmb.highways.dist_vx += mt.distance_way(way);
			osmb.highways.vx += 1;
		}
	}
	//buildings
	if (way.tags().building !== undefined) {
		osmb.buildings.total += 1;
		//count num of buildings
		if (way.version === 1) {
			osmb.buildings.v1 += 1;
		} else {
			osmb.buildings.vx += 1;
		}
	}

});
// handler.on('relation', function(relation) {
// 	//console.log(relation)

// });
handler.on('done', function() {
	console.log(osmb);
});


// stream.on('data', function(object) {
//     if (counts.hasOwnProperty(object.type)) {
//         counts[object.type]++;
//     } else {
//         counts.other++;
//     }
// });


osmium.apply(reader, location_handler, handler);