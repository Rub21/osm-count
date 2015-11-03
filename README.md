#  OSM objects counter 

Prepare your OSM file using [osm-extract](https://github.com/Rub21/osm-object-counter/tree/master/osm-extract)

```
git clone https://github.com/Rub21/osm-count.git
cd osm-count
npm install

```

#### Counter all objects

```
node index.js --osmfile osm-extract/osm.osm.bz

```


#### Counter objects per specific users


```
node index.js --osmfile osm-extract/osm.osm.bz --usersfile osm-extract/users

```

#### Counter objects specific range specific date.

```
node index.js --osmfile osm-extract/osm.osm.bz --usersfile osm-extract/users

```


In both cases the output files are  in markdown tables: 

- osm_objects.md
- users.md
- tags.md
- roads_distance.md
 

 