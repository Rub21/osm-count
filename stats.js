var turf = require('turf')
var osmium = require('osmium')

var file = new osmium.File('./mexico.osm.bz2');
var location_handler = new osmium.LocationHandler();
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

var total = 0
var buildings = 0
stream.on('data', function(way) {
  if(way.type === 'way'){
    try{
      var tags = way.tags()
      if(tags.building) buildings++
      else if(tags.highway || tags.bridge) {
        var line = turf.linestring(way.node_coordinates().map(function(coord){ return [coord.lon, coord.lat] }))
        total += turf.lineDistance(line, 'miles')
      }
    } catch(e){

    }
  }
});

stream.on('end', function() {
  console.log(buildings)
  console.log(total)
});

