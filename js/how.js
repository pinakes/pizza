function how(data, tooltip) {

	var indexedByHow = data.reduce(function (prev, curr) {
		if (prev[curr.how]) {
	    	prev[curr.how] += 1;
		} else {
	    	prev[curr.how] = 1;
		}
		return prev;
	}, {});

	var typeDataHow = [];

	for (var label in indexedByHow) {
	  typeDataHow.push({label: label, value: indexedByHow[label]});
	}

	console.log(typeDataHow)

	var radius = Math.min(960, 500) / 2;
	
	d3.select("svg#how").append("defs")
		.append("pattern")
		.attr("id", "bg")
		.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 298)
        .attr('height', 298)
        .attr('x', 60)
		.attr('y', 0)
		.append("image")
			.attr("xlink:href", "/images/pizzaPattern.jpg")
			.attr('width', 300)
	        .attr('height', 300)
	        .attr('x', 0)
			.attr('y', 0);
	
	d3.select("svg#how")
	    .attr("width", 960)
	    .attr("height", 500)
	 	.append("g")
	 	.attr("class", "pizzaPie")
	    .attr("transform", "translate(" + 960 / 2 + "," + 500 / 2 + ")")
	
	d3.select(".pizzaPie")
		.style("fill", "url(#bg)")

	var arc = d3.svg.arc()
	    .innerRadius(250);

	var pieHow = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.value; });

	var howGraph = d3.select(".pizzaPie").selectAll(".arc")
    	.data(pieHow(typeDataHow))
    	.enter().append("g")
      	.attr("class", "arc");

    howGraph.append("path")
		.attr("d", arc)
		.style({
			//"fill" : "#F80404",
		    "stroke": "#FFFFF7",
		    "stroke-width": 5
		})
		.attr("d", arcPhantom).style('stroke', 'white')

	function type(d) {
		d.population = +d.population;
		return d;
	}

}