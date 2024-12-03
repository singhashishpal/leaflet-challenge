// Define the new GeoJSON URL for all earthquakes in the past week
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the base layers for the map
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom level
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetMap]
});

// Layer group for earthquakes
let earthquakeLayer = L.layerGroup();

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 4;  // Adjust size as needed
}

// Function to determine marker color based on depth
function getColor(depth) {
  return depth > 90 ? '#FF5F65' :
         depth > 70 ? '#FCA35D' :
         depth > 50 ? '#FDB72A' :
         depth > 30 ? '#F7DB11' :
         depth > 10 ? '#DCFF92' :
                      '#A3FF73';
}

// Fetch the GeoJSON data using D3
d3.json(queryUrl).then(function(data) {
  // Create a GeoJSON layer with the earthquake data
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {
        radius: markerSize(feature.properties.mag), // Magnitude affects size
        fillColor: getColor(feature.geometry.coordinates[2]), // Depth affects color
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
  }).addTo(earthquakeLayer);

  // Add the earthquake layer to the map
  earthquakeLayer.addTo(myMap);

  // Add a legend to the map
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
        depth = [-10, 10, 30, 50, 70, 90],
        colors = ['#A3FF73', '#DCFF92', '#F7DB11', '#FDB72A', '#FCA35D', '#FF5F65'];
      // Add a header for the legend
  div.innerHTML += "<h4>Depth (km)</h4>";   

    // Loop through depth intervals to generate a label with colored squares
    for (let i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Add legend to the map
  legend.addTo(myMap);
});
