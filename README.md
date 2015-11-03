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

We can think if I filtered per users the OSM file in `osm-extract`, but is necessary filter again because when we created the file we are using ` --complete-ways` it update with many nodes which are not made or update per data-team.

In both cases the output files are  in markdown tables: 

- osm_objects.md
- users.md
- tags.md
- roads_distance.md
 

 