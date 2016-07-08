# Stream Watch

(full README still to come)

Stream Watch allows users to enter an address or use geolocation on their mobile device to find USGS Stream Gaging stations in their vicinity and retrieve real-time data pertaining to these sites from the USGS Instantaneous Web Service API.

### Installing Dependencies & Running
From within the root directory:

```sh
npm install
```
then

```sh
npm start
```
###Notes

Currently the mobile geolocation function has yet to be implemented.

####Notes on Data Parameters:

Gage Height - 
Gage height is measured in tenths of a foot and indicates the height of the water in relation to the site’s datum, an arbitrary point below the stream bed.

Stream Flow (Discharge) - 
Flow or discharge is measured in cubic feet per second and indicated the volume of water moving down the channel per unit of time.

Reservoir Elevation - 
Reservoir elevation is measured in tenths of a foot and indicates a reservoir’s water level above Mean Sea Level (MSL), NGVD 1929.

Distance - 
Distance between the user’s address or point of origin and any particular site is currently calculated using an implementation of the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) which assumes distance across the surface of a perfect sphere and therefor is not 100% accurate.  Distances close to the equator will be underestimated and those close to the poles will be overestimated due to the Earth’s spheroid shape. 
