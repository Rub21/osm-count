### Install

`./install.sh`

### Get OSM Data

For the example we are going to get the last 10 days chnagset from Mapbox data team in Afganistan

##### Build osm for whole world 

`./buildosm.sh 137 147`

##### Build osm file for a specific area

You can find all the poly in `boundary` folder

`./buildosm.sh 137 147 boundary/afghanistan.poly`

output: **osm.osm.bz2**

#####  Build osm file for specific and specifics users 

Add the  users in  on file `users` and execute

`./buildosm.sh 137 147 boundary/afghanistan.poly users`


The number are the range from replication files: http://planet.osm.org/replication/day/000/001/

- [137](http://planet.osm.org/replication/day/000/001/137.osc.gz) Date : 2015-10-29 00:06 
- [147](http://planet.osm.org/replication/day/000/001/142.osc.gz) Date : 2015-11-02 00:06 