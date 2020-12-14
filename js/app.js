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

  // mapbox API access Token
  // var accessToken = '<your access token here>'
  // var accessToken = 'pk.eyJ1IjoidWtncmFkOTUiLCJhIjoiY2tiZTR2cWhmMGlhejJzb2l5eG9pcW1ldCJ9.GpQXTEFxWn2N6ur5BPxRbg';

  // mapbox API parameters
  const accessToken =
    `pk.eyJ1IjoidWtncmFkOTUiLCJhIjoiY2tiZTR2cWhmMGlhejJzb2l5eG9pcW1ldCJ9.GpQXTEFxWn2N6ur5BPxRbg`
  const yourName = 'ukgrad95'
  const yourMap = 'ckh78a58h0emu19ltuxd3u46b'


  /*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: accessToken
  }).addTo(map);*/

  L.tileLayer(`https://api.mapbox.com/styles/v1/${yourName}/${yourMap}/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);

  // use omnivore to load the CSV data
  omnivore.csv('data/battlesites.csv')
    .on('ready', function (e) {
      //console.log(e.target)
      drawMap(e.target.toGeoJSON());
      //drawLegend(e.target.toGeoJSON());
    })
    .on('error', function (e) {
      console.log(e.error[0].message);
      //}).addTo(map); // add the point data to the map
    });


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

    // create separate layers from GeoJSON data
    //const americanrevolutionLayer = L.geoJson(data, options).addTo(map),
    //  civilwarLayer = L.geoJson(data, options).addTo(map),
    //  frenchindianLayer = L.geoJson(data, options).addTo(map),
    //  kinggeorgeLayer = L.geoJson(data, options).addTo(map),
    //  kingwilliamLayer = L.geoJson(data, options).addTo(map),
    //  queenanneLayer = L.geoJson(data, options).addTo(map),
    //  jenkinsLayer = L.geoJson(data, options).addTo(map),
    //  indianwarsLayer = L.geoJson(data, options).addTo(map),
    //  rebellionsLayer = L.geoJson(data, options).addTo(map),
    //  mexicanwarLayer = L.geoJson(data, options).addTo(map),
    //  war1812Layer = L.geoJson(data, options).addTo(map),
    //  worldwarLayer = L.geoJson(data, options).addTo(map),
    //  year = L.geoJson(data, options).addTo(map);


    // war layer colors
    /*americanrevolutionLayer.setStyle({
      color: '#FF0000',
    });
    civilwarLayer.setStyle({
      color: '#808080',
    });
    frenchindianLayer.setStyle({
      color: '#0000FF',
    });
    kinggeorgeLayer.setStyle({
      color: '#0000FF',
    });
    kingwilliamLayer.setStyle({
      color: '#0000FF',
    });
    queenanneLayer.setStyle({
      color: '#0000FF',
    });
    jenkinsLayer.setStyle({
      color: '#0000FF',
    });
    indianwarsLayer.setStyle({
      color: '#cd5c5c',
    });
    rebellionsLayer.setStyle({
      color: '#FFa500',
    });
    mexicanwarLayer.setStyle({
      color: '#008000',
    });
    war1812Layer.setStyle({
      color: '#000080',
    });
    worldwarLayer.setStyle({
      color: '#800080',
    });

    const sourceLayers = {

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



    L.control.layers(null, sourceLayers, {
      collapsed: false,
      color: '#FF0000'
    }).addTo(map);

    // fit the bounds of the map to one of the layers
    map.fitBounds(worldwarLayer.getBounds());

    // adjust zoom level of map
    map.setZoom(map.getZoom() - .4);

    resizeCircles(americanrevolutionLayer,
      civilwarLayer,
      frenchindianLayer,
      kinggeorgeLayer,
      kingwilliamLayer,
      queenanneLayer,
      jenkinsLayer,
      indianwarsLayer,
      rebellionsLayer,
      mexicanwarLayer,
      war1812Layer,
      worldwarLayer,
    );

    // drawLegend(data);

    sequenceUI(americanrevolutionLayer,
      civilwarLayer,
      frenchindianLayer,
      kinggeorgeLayer,
      kingwilliamLayer,
      queenanneLayer,
      jenkinsLayer,
      indianwarsLayer,
      rebellionsLayer,
      mexicanwarLayer,
      war1812Layer,
      worldwarLayer,
      year,
    );

  } // end drawMap(data)

  function calcRadius(val) {

    const radius = Math.sqrt(val / Math.PI);
    return radius * .25; // adjust .5 as a scale factor

  }

  function resizeCircles(americanrevolutionLayer,
    civilwarLayer,
    frenchindianLayer,
    kinggeorgeLayer,
    kingwilliamLayer,
    queenanneLayer,
    jenkinsLayer,
    indianwarsLayer,
    rebellionsLayer,
    mexicanwarLayer,
    war1812Layer,
    worldwarLayer) {

    americanrevolutionLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    civilwarLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    frenchindianLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    kinggeorgeLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    kingwilliamLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    queenanneLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    jenkinsLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    indianwarsLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    rebellionsLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    mexicanwarLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    war1812Layer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });
    worldwarLayer.eachLayer(function (layer) {
      const radius = calcRadius();
      layer.setRadius(radius);
    });

    retrieveInfo(sourceLayers, currentYear);
    updateYear(currentYear);
  } // end resizeCircles()

  function retrieveInfo(sourceLayers, currentYear) {
    // select the element and reference with variable
    // and hide it from view initially
    const info = $('#info').hide();

    // use to detect mouseover events
    sourceLayer.on('mouseover', function (e) {

      // remove the none class to display and show
      info.show();

      // access properties of target layer
      const props = e.war;
      activeLayer = e.Layer;

      // populate HTML elements with relevant info
      //$('#info span').html(props.Site);
      //$(".girls span:first-child").html(`(grade ${currentGrade})`);
      //$(".boys span:first-child").html(`(grade ${currentGrade})`);
      //$(".girls span:last-child").html(Number(props[`G${currentGrade}`]).toLocaleString());
      //$(".boys span:last-child").html(Number(props[`B${currentGrade}`]).toLocaleString());

      // raise opacity level as visual affordance
      e.layer.setStyle({
        fillOpacity: .6
      });

      // empty arrays values
      //const girlsValues = [],
      //  boysValues = [];

      // loop through the grade levels and push values into those arrays
      //for (let i = 1; i <= 8; i++) {
      //  girlsValues.push(props['G' + i]);
      //  boysValues.push(props['B' + i]);
      //}

    });

    // hide the info panel when mousing off layergroup and remove affordance opacity
    sourceLayer.on('mouseout', function (e) {

      // hide the info panel
      info.hide();

      // reset the layer style
      e.layer.setStyle({
        fillOpacity: 0
      });
    });

    // when the mouse moves on the document
    $(document).mousemove(function (e) {
      // first offset from the mouse position of the info window
      info.css({
        "left": e.pageX + 6,
        "top": e.pageY - info.height() - 25
      });

      // if it crashes into the top, flip it lower right
      if (info.offset().top < 4) {
        info.css({
          "top": e.pageY + 15
        });
      }
      // if it crashes into the right, flip it to the left
      if (info.offset().left + info.width() >= $(document).width() - 40) {
        info.css({
          "left": e.pageX - info.width() - 80
        });
      }
    });
  }

  function sequenceUI(year) {

    // sequenceUI function body

    // create Leaflet control for the slider
    const sliderControl = L.control({
      position: 'bottomleft'
    });

    sliderControl.onAdd = function (map) {

      const controls = L.DomUtil.get("slider");

      L.DomEvent.disableScrollPropagation(controls);
      L.DomEvent.disableClickPropagation(controls);

      return controls;

    }

    // add it to the map
    sliderControl.addTo(map);

    // create Leaflet control for the year legend
    const yearControl = L.control({
      position: 'bottomleft'
    });

    yearControl.onAdd = function (map) {

      const controls = L.DomUtil.get("Year");

      L.DomEvent.disableScrollPropagation(controls);
      L.DomEvent.disableClickPropagation(controls);

      return controls;
    }

    // add year legend to map
    yearControl.addTo(map);

    // select the slider's input and listen for change
    $('#slider input[type=range]')
      .on('input', function () {

        // current value of slider is current grade level
        var currentYear = this.value;
        $('#year span').html(currentYear);
        $('#slider p span').html(currentYear);

        // resize the circles with updated grade level
        resizeCircles();

      });
  } // end sequenceUI()

  /*function drawLegend(data) {
    // create Leaflet control for the legend
    const legendControl = L.control({
      position: 'bottomright'
    });

    // when the control is added to the map
    legendControl.onAdd = function (map) {

      // select the legend using id attribute of legend
      const legend = L.DomUtil.get("legend");

      // disable scroll and click functionality 
      L.DomEvent.disableScrollPropagation(legend);
      L.DomEvent.disableClickPropagation(legend);

      // return the selection
      return legend;

    }

    legendControl.addTo(map);

    // empty array to hold values
    const dataValues = [];

    // loop through all features (i.e., the schools)
    data.features.forEach(function (school) {
      // for each grade in a school
      for (let grade in school.properties) {
        // shorthand to each value
        const value = school.properties[grade];
        // if the value can be converted to a number 
        // the + operator in front of a number returns a number
        if (+value) {
          //return the value to the array
          dataValues.push(+value);
        }

      }
    });
    // verify your results!
    console.log(dataValues);

    // sort our array
    const sortedValues = dataValues.sort(function (a, b) {
      return b - a;
    });

    // round the highest number and use as our large circle diameter
    const maxValue = Math.round(sortedValues[0] / 1000) * 1000;

    // calc the diameters
    const largeDiameter = calcRadius(maxValue) * 2,
      smallDiameter = largeDiameter / 2;

    // select our circles container and set the height
    $(".legend-circles").css('height', largeDiameter.toFixed());

    // set width and height for large circle
    $('.legend-large').css({
      'width': largeDiameter.toFixed(),
      'height': largeDiameter.toFixed()
    });
    // set width and height for small circle and position
    $('.legend-small').css({
      'width': smallDiameter.toFixed(),
      'height': smallDiameter.toFixed(),
      'top': largeDiameter - smallDiameter,
      'left': smallDiameter / 2
    })

    // label the max and median value
    $(".legend-large-label").html(maxValue.toLocaleString());
    $(".legend-small-label").html((maxValue / 2).toLocaleString());

    // adjust the position of the large based on size of circle
    $(".legend-large-label").css({
      'top': -11,
      'left': largeDiameter + 30,
    });

    // adjust the position of the large based on size of circle
    $(".legend-small-label").css({
      'top': smallDiameter - 11,
      'left': largeDiameter + 30
    });

    // insert a couple hr elements and use to connect value label to top of each circle
    $("<hr class='large'>").insertBefore(".legend-large-label")
    $("<hr class='small'>").insertBefore(".legend-small-label").css('top', largeDiameter - smallDiameter - 8);

  }*/
  function updateYear(currentYear) {

    //select the slider's input and listen for change
    $('#year span').html(currentYear);

  } // end updateYear()

})();