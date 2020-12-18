(function () {

    const map = L.map('map', {
      zoomSnap: .1,
      center: [38.821396926447974, -100.0458662281896],
      zoom: 5,
      //minZoom: 6,
      //maxZoom: 10,
      //scrollWheelZoom: true,
      //zoomSnap: .1,
      //dragging: true,
      //zoomControl: true
      //maxBounds: L.latLngBounds([-6.22, 27.72], [5.76, 47.83])
    });

    // mapbox API parameters
    const accessToken =
      `pk.eyJ1IjoidWtncmFkOTUiLCJhIjoiY2tiZTR2cWhmMGlhejJzb2l5eG9pcW1ldCJ9.GpQXTEFxWn2N6ur5BPxRbg`
    const yourName = 'ukgrad95'
    const yourMap = 'ckh78a58h0emu19ltuxd3u46b'

    L.tileLayer(`https://api.mapbox.com/styles/v1/${yourName}/${yourMap}/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);

    // use omnivore to load the CSV data
    omnivore.csv('data/battlesites.csv')
      .on('ready', function (e) {
        console.log(e.target)
        drawMap(e.target.toGeoJSON());
        //drawLegend(e.target.toGeoJSON());
      })
      .on('error', function (e) {
        console.log(e.error[0].message);
        
      }).addTo(map); // add the point data to the map


    function drawMap(data) {
      // access to data here
      console.log(data);

      const options = {
        pointToLayer: function (feature, ll) {
          return L.circleMarker(ll, {
            opacity: 1,
            weight: 2,
            fillOpacity: 0.5,
          })
        }
      }

      /*const sourceLayers = {

        "<b style='color:#FF0000'>American Revolution (1775-1783)</b>": americanrevolutionLayer,
        "<b style='color:#808080'>Civil War (1861-1865)</b>": civilwarLayer,
        "<b style='color:#0000FF'>French & Indian War (1754-1763)</b>": frenchindianLayer,
        "<b style='color:#0000FF'>French & Indian War - King George's War (1744-1748)</b>": kinggeorgeLayer,
        "<b style='color:#0000FF'>French & Indian War - King William's War (1688-1697)</b>": kingwilliamLayer,
        "<b style='color:#0000FF'>French & Indian War - Queen Anne's War (1702-1713)</b>": queenanneLayer,
        "<b style='color:#0000FF'>French & Indian War - War of Jenkins' Ear (1744-1748)</b>": jenkinsLayer,
        "<b style='color:#cd5c5c'>Indian Wars (1609-1924)</b>": indianwarsLayer,
        "<b style='color:#FFa500'>Insurrections & Rebellions</b>": rebellionsLayer,
        "<b style='color:#008000'>Mexican War (1846-1848)</b>": mexicanwarLayer,
        "<b style='color:#000080'>War of 1812 (1812-1815)</b>": war1812Layer,
        "<b style='color:#800080'>World War II (1939-1945)</b>": worldwarLayer,

      }*/
      const eventLookup = {
        americanrevolutionLayer: {
          color: '#FF0000',
          symbol: 'marker-15.1.svg',
          filter: 'American Revolution (1775-1783)'
        },
        civilwarLayer: {
          color: '#808080',
          symbol: 'marker-15.2.svg',
          filter: 'Civil War (1861-1865)'

        },
        war1812Layer: {
          color: '#000080',
          symbol: 'marker-15.3.svg',
          filter: 'War of 1812 (1812-1815)'
        }
      }

      let wars = {}
      let legendWars = {}

      for (let w in eventLookup) {
        const icon = L.icon({
          iconUrl: `icons/${eventLookup[w].symbol}`,
          iconSize: [30, 30]
        })
        wars[w] = L.geoJson(data, {
          filter: function (feature) {
            if (eventLookup[w].filter == feature.properties.War) {
              return feature
            }
          },
          pointToLayer: function (point, latlng) {
            return L.marker(latlng, {
              icon: icon
            })
          },
          onEachFeature: function (feature, layer) {
            const p = feature.properties
            const popup = `${p.Site}`
            layer.bindPopup(popup)

          }
        }).addTo(map)
        const buildStyle = `<b style='color:${eventLookup[w].color}'>${eventLookup[w].filter}</b>`
        legendWars[buildStyle] = wars[w]
      }

      //console.log(legendWars)
      //L.control.layers(null, legendWars, {
      const legendBuilt = L.control.layers(null, legendWars, {
        collapsed: false,
        color: '#FF0000'
      }).addTo(map);

      // fit the bounds of the map to one of the layers
      map.fitBounds(wars.civilwarLayer.getBounds());

      // adjust zoom level of map
      // map.setZoom(map.getZoom() - .4);

    } // end drawMap(data)
  
})