# leaflet-challenge
This project aims to fill that gap by creating an interactive map that visualizes earthquake data, allowing users to see earthquake magnitude, depth, and location easily.


1. Earthquake Visualization

In  the challenge, we focus on creating a dynamic map that displays earthquake data from a USGS GeoJSON feed. This visualization highlights both the magnitude and depth of each earthquake through size and color, respectively.

* Data Source: The data is fetched from the USGS GeoJSON feed, which provides up-to-date earthquake information.
* Map Visualization: 
- a. Earthquakes are plotted based on their longitude and latitude coordinates.
- b. Each earthquake is represented by a circle marker, with:Marker size reflecting the earthquake's magnitude and Marker color representing the earthquake's depth, where deeper earthquakes are shown with darker colors.
* Interactivity: Each marker includes a popup that displays detailed information about the earthquake, such as its location, magnitude, and depth, providing users with additional context.
* Legend: A dynamic legend is included to provide users with a clear understanding of the color scale related to earthquake depth.


* Libraries and Tools
 Leaflet.js:  A JavaScript library for creating interactive maps.
 D3.js: For pulling the GeoJSON data and creating the scale for circle marker sizes and colors.
