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
        
      })//.addTo(map); // add the point data to the map


    function drawMap(data) {
      // access to data here
      // console.log(data);

      // const options = {
      //  pointToLayer: function (feature, ll) {
      //    return L.circleMarker(ll, {
      //      opacity: 1,
      //      weight: 2,
      //      fillOpacity: 0.5,
      //    })
      //  }
      //}

      /*const sourceLayers = {
        "<b style='color:#FF0000'>American Revolution (1775-1783)</b>": americanrevolutionLayer,
        "<b style='color:#808080'>Civil War (1861-1865)</b>": civilwarLayer,
        "<b style='color:#0000FF'>French & Indian War - King George's War (1744-1748)</b>": kinggeorgeLayer,
        "<b style='color:#0000FF'>French & Indian War - King William's War (1688-1697)</b>": kingwilliamLayer,
        "<b style='color:#0000FF'>French & Indian War - Queen Anne's War (1702-1713)</b>": queenanneLayer,
        "<b style='color:#0000FF'>French & Indian War - Seven Year's War (1754-1763)</b>": sevenyearLayer,
        "<b style='color:#0000FF'>French & Indian War - War of Jenkins' Ear (1744-1748)</b>": jenkinsLayer,
        "<b style='color:#cd5c5c'>Indian Wars (1609-1924)</b>": indianwarsLayer,
        "<b style='color:#FFa500'>Insurrections & Rebellions</b>": rebellionsLayer,
        "<b style='color:#008000'>Mexican War (1846-1848)</b>": mexicanwarLayer,
        "<b style='color:#000080'>War of 1812 (1812-1815)</b>": war1812Layer,
        "<b style='color:#800080'>World War II (1939-1945)</b>": worldwarLayer,
      }*/

      const eventLookup = {
        americanrevolutionLayer: {
          color: '#FF0000', // red
          symbol: 'cross-muskets2.png',
          filter: 'American Revolution (1775-1783)'
        },
        civilwarLayer: {
          color: '#808080', // gray
          symbol: 'field-artillery3.png',
          filter: 'Civil War (1861-1865)'
        },
        kinggeorgeLayer: {
          color: '#ffef00', // canary yellow
          symbol: 'king-george-ii-mono.png',
          filter: "French & Indian War - King George's War (1744-1748)"
        },
        kingwilliamLayer: {
          color: '#7fff00', // chartreuse
          symbol: 'king-william-iii.jpg',
          filter: "French & Indian War - King William's War (1688–1697)"
        },
        queenanneLayer: {
          color: '#ff007f', // bright pink
          symbol: 'QueenAnne1702.jpg',
          filter: "French & Indian War - Queen Anne's War (1702-1713)"
        },
        sevenyearLayer: {
          color: '#318ce7', // bleu de france
          symbol: 'cross-arrows3.png',
          filter: "French & Indian War - Seven Year's War (1754-1763)"
        },
        jenkinsLayer: {
          color: '#3fff00', // harlequin
          symbol: 'marker-15.2.svg',
          filter: "French & Indian War - War of Jenkins' Ear (1744-1748)"
        },
        indianwarsLayer: {
          color: '#cd5c5c', // indian red
          symbol: 'indian-arrowhead2.png',
          filter: 'Indian Wars (1609-1924)'
        },
        rebellionsLayer: {
          color: '#FFa500', // orange
          symbol: 'fire.png',
          filter: 'Insurrections & Rebellions'
        },
        mexicanwarLayer: {
          color: '#008000', // green
          symbol: 'cross-saber2.png',
          filter: 'Mexican War (1846-1848)'
        },
        war1812Layer: {
          color: '#0000FF', // blue
          symbol: 'ship.png',
          filter: 'War of 1812 (1812-1815)'
        },
        worldwarLayer: {
          color: '#800080', // purple
          symbol: 'grenade.png',
          filter: 'World War II (1939-1945)'
        },
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
            const popup = `<h3>${p.Site}</h3>
            ${p.War}<br>
            ${p.Belligerent1} vs. ${p.Belligerent2}<br>
            ${p.Dates}`
            layer.bindPopup(popup)

          }
        }).addTo(map)
        const buildStyle = `<b style='color:${eventLookup[w].color}'>${eventLookup[w].filter}</b>`
        legendWars[buildStyle] = wars[w]
      }

      console.log(legendWars)
      
      const legendBuilt = L.control.layers(null, legendWars, {
        collapsed: false,
        color: '#FF0000'
      }).addTo(map);

      // fit the bounds of the map to one of the layers
      map.fitBounds(wars.civilwarLayer.getBounds());

      // adjust zoom level of map
      // map.setZoom(map.getZoom() - .4);

    } // end drawMap(data)
  
  })() // the missing pair of () to invoke function 