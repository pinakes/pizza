function world(worldMap, pizzaData, tooltip) {

	// grouping the cities
	var indexedByCity = pizzaData.reduce(function (prev, curr) {
		if (prev[curr.city]) {
	    	prev[curr.city] = {value: prev[curr.city].value + 1, longi: curr.longi, lat: curr.lat};
		} else {
	    	prev[curr.city] = {value: 1, longi: curr.longi, lat: curr.lat};
		}
		return prev;
	}, {});

	var typeDataCity = [];

	for (var city in indexedByCity) {
		typeDataCity.push({
			label: city, 
			value: indexedByCity[city].value, 
			longi: indexedByCity[city].longi, 
			lat: indexedByCity[city].lat
		});
	}
	console.log(typeDataCity)

	// world map
	var mapWidth = width,
		mapHeight = 450


	var projection = d3.geo.mercator()
	    .scale(mobileMap(width))
	    .translate([mapWidth / 1.5, mapHeight / 1.3])
	    .precision(.5);

	var zoom = d3.behavior.zoom()
	    .translate(projection.translate())
	    .scale(projection.scale())
	    .scaleExtent([100, 2000])
	    .on("zoom", zoomed);

	var map = d3.select("#location")
	  .attr("width", mapWidth)
	  .attr("height", mapHeight);

	var path = d3.geo.path()
	  .projection(projection);

	var g = map.append("g")
		.call(zoom);

	g.append("rect")
	    .attr("class", "background")
	    .attr("width", mapWidth)
	    .attr("height", mapHeight)
	    .attr("fill", "url(#sea-pattern)")

	g.selectAll("path")
		.data(topojson.object(worldMap, worldMap.objects.countries).geometries)
	  	.enter()
	    .append("path")
	    .attr("class", function(d) { return "subunit " + d.id; })
	    .attr("d", path)
	    .attr("fill", "#EBE1C5")

	g.append("path")
		.datum(topojson.mesh(worldMap, worldMap.objects.countries, function(a, b) { return a !== b; }))
		.attr("class", "boundary")
		.attr("d", path);

	g.selectAll(".mark")
	    .data(typeDataCity)
	    .enter()
	    .append("circle")
	    .attr("class", "pizzaPin")
	    .attr('r', function(d) { return 5 + d.value / 1.8})
	    .attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
	    .on("mouseover", function(d) {
        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html(d.label + "<br/><hr><i>" + d.value + plural(d.value) + "</i>")
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX) + "px",
	               	"top": (d3.event.pageY - 80) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	})

    g.selectAll(".mark")
	    .data(typeDataCity)
	    .enter()
    	.append("circle")
    	.attr("r", 2)
    	.attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
    	.attr("class", "pizzaPinCenter")

    function zoomed() {
		projection.translate(d3.event.translate).scale(d3.event.scale);
		g.selectAll("path").attr("d", path)
		g.selectAll(".pizzaPin")
			.attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
			.attr('r', function(d) { return 5 + d.value / 1.8})
		g.selectAll(".pizzaPinCenter")
			.attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
			.attr('r', 2)
	}


    function nycLongi(longi){
    	console.log(longi)
    	var newLongi
    	if (longi <= 73.5 && longi >= 74.1) {
    		newLongi = 74;
    		console.log(newLongi)
    		return newLongi;
    	} else {
    		console.log(longi)
    		return longi;
    	}
    }
    function nycLat(lat){
    	console.log(lat)
    	var newLat
    	if (lat <= 41 && lat >= 40.5) {		
		    newLat = 40; 
		    console.log(newLat)
    		return newLat;
    	} else {
    		console.log(lat)
    		return lat;
    	}
    }

    function mobileMap(width) {
    	if (width < 960 ) { return 150 } else { return 250 }
    }
    /*
	g.selectAll(".numbers")
		.data(typeDataCity)
		.enter()
		.append("text")
		.attr("class", "pizzaVote")
		.text(function(d) { 
			if (d.value >= 10){
				return d.value 
			}
		})
		.attr("fill", "white")
		.style("font-size", "12px")
		.attr("transform", function(d) { return "translate(" + projection([d.longi - 1.3, d.lat - 0.7]) + ")";});
	*/

}