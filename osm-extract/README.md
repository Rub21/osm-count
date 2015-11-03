# OSM extract

Build you osm file from each date as you want. you can build the OSM file in a instance or in your local machine. To get the range of date  go to http://planet.osm.org/replication/day/000/ and  check out  the data:



 For the next example, I will take the date [range](https://cloud.githubusercontent.com/assets/1152236/10920336/8ab2e2a2-823d-11e5-93ce-c4479d5fc8b8.png) from  2015-10-24 00:06  to  2015-11-03 00:06

- [137](http://planet.osm.org/replication/day/000/001/137.osc.gz) Date : 2015-10-24 00:06 
- [147](http://planet.osm.org/replication/day/000/001/142.osc.gz) Date : 2015-11-02 00:06 


#### Clone the repository

```
git clone https://github.com/Rub21/osm-object-counter.git
cd osm-object-counter
npm install

```

#### Install requirements libraries

` cd osm-object-counter/osm-extract/ && ./install.sh`


#### Build the OSM file for whole world 

`./buildosm.sh 137 147`

output: **osm.osm.bz2**

#### Build the OSM file for a specific area

If you want delimiter by a area, you're going to need a `poly` file,  you can check [here](https://oegeo.wordpress.com/2011/11/05/tutorial-poly/) how to create a poly file using Qgis.

for this example you can find some poly files in  `/boundary` folder

When your poly file is done, execute the next command line. 

`./buildosm.sh 137 147 boundary/afghanistan.poly`

output: **osm.osm.bz2**

####  Build the OSM file for specific area and specifics users 

In [/osm-extract/users](https://github.com/Rub21/osm-object-counter/blob/master/osm-extract/users) file you can find a list of users, if you want you can add more users or remove them

When your users file is done, execute the next command line. 

`./buildosm.sh 137 147 boundary/afghanistan.poly users`

output: **osm.osm.bz2**



