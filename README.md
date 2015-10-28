#  OSM counter objects

 Prepare you OSM fie using osm-extract

Example the file from is https://s3.amazonaws.com/mapbox/playground/ruben/mexico.osm.bz2

```
git clone https://github.com/Rub21/osm-count.git
cd osm-count
npm install
node index.js --osmfile=mexico.osm.bz
```
output file are: 

- osm_objects.md
- users.md
- tags.md
- roads_distance.md
 
 all in markdown tables
 