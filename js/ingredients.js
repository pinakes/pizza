function ingredients(data) {
	var ingredients = [];

	data.forEach(function(d){
		var inSplit = d.topping.split(", ");

		for (var i = 0; i < inSplit.length; i++) {
			ingredients.push({"topping":inSplit[i]});
		}
	})

	var indexedByTopping = ingredients.reduce(function (prev, curr) {
		if (prev[curr.topping]) {
	    	prev[curr.topping] += 1;
		} else {
	    	prev[curr.topping] = 1;
		}
		return prev;
	}, {});

	var typeDataTopping = [];

	for (var topping in indexedByTopping) {
	  typeDataTopping.push({label: topping, value: indexedByTopping[topping]});
	}

	var pie = d3.layout.pie()
		.sort(null)
	    .value(function(d) { return d.value; });

	xTpp.domain([0, d3.max(typeDataTopping, function(d) { return d.value; })]);

	// Pie
	/*
	var w = 960;
	var h = 700;
	var center = 960 / 2;
	var radius = Math.min(w, h) / 2;
	var outerRadius = 240;
	var innerRadius = 0;

	var key = function(d){ return d.data.label; };

	//Create SVG element
	var svg = d3.select("svg#topping")
		.attr("width", w)
		.attr("height", h)
		.append("g")

	svg.attr("transform", "translate(" + center + ", " + center / 1.3 + ")")
		.append("defs")
			.append("pattern")
			.attr("id", "bg")
			.attr('patternUnits', 'userSpaceOnUse')
	        .attr('width', 124)
	        .attr('height', 124)
	        .attr('x', 60)
			.attr('y', 0)
			.append("image")
				.attr("xlink:href", "/images/pizzaPattern.jpg")
				.attr('width', 125)
		        .attr('height', 125)
		        .attr('x', 0)
				.attr('y', 0);

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	var arc = d3.svg.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	var arcOutter = d3.svg.arc()
	    .innerRadius(outerRadius)
	    .outerRadius(outerRadius + 10);

	var arcPhantom = d3.svg.arc()
	    .innerRadius(0)
	    .outerRadius(outerRadius + 20);

	var outerArc = d3.svg.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	var innerArc = d3.svg.arc()
		.innerRadius(radius * 0.6)
		.outerRadius(radius * 0.6);

	//Set up groups
	var slice = svg.select(".slices")

	var arcs = slice.selectAll("g.arc")
	    .data(pie(typeDataTopping))
	    .enter()
	    .append("g")
	    .attr("class", "arc");
	    

	//Set up outter arc groups
	var outterArcs = slice.selectAll("g.outter-arc")
	    .data(pie(typeDataTopping))
	    .enter()
	    .append("g")
	    .attr("class", "outter-arc");

	//Set up phantom arc groups
	var phantomArcs = slice.selectAll("g.phantom-arc")
	    .data(pie(typeDataTopping))
	    .enter()
	    .append("g")
	    .attr("class", "phantom-arc");

	//Draw arc paths
	arcs.append("path")
		.style("fill", "url(#bg)")
	    .attr("d", arc);

	//Draw outter arc paths
	outterArcs.append("path")
	    .attr("fill", '#EBC66C')
	    .attr("d", arcOutter).style('stroke', '#FFFFF7')
	    .style('stroke-width', 0);

	//Draw phantom arc paths
	phantomArcs.append("path")
	    .attr("fill", '#FFFFF7')
	    .attr("fill-opacity", 0)
	    .attr("d", arcPhantom).style('stroke', '#FFFFF7')
	    .style('stroke-width', 6);

	//    
	// Labels text 
	//

	var text = svg.select(".labels").selectAll("text")
		.data(pie(typeDataTopping), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.style("font-size", "14px")
		.text(function(d) {
			return d.data.value + " - " + d.data.label;
		});
	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	//text.exit()
		//.remove();

	// Labels line 
	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(typeDataTopping), key);
	
	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [innerArc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	//polyline.exit()
		//.remove();
	*/


	var pizzaToppings = d3.select("#topping")
		.style({
			"width": halfWidth + margin.left + margin.right + "px",
			"height": typeDataTopping.length * 30 + "px"
		})
	var pizzaTopping = d3.selectAll(".pizzaToppings")

	pizzaToppings.selectAll(".pizzaToppings")
		.data(typeDataTopping)
		.enter().append("div")
		.attr("class", "pizzaToppings")

	d3.selectAll(".pizzaToppings")
		.append("text")
		.attr("class", "pizzaToppingText")
		.text(function(d) { return d.label; })

	d3.selectAll(".pizzaToppings")
		.append("text")
		.attr("class", "pizzaToppingValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".pizzaToppings")
		.append("div")
		.attr("class", "pizzaTopping")
		.style({
			"height": "5px",
			"width": function(d) { return xTpp(d.value) - 6 + "px"; }
		})
}
