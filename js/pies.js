function pies(data, tooltip) {

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var indexedByHow = data.reduce(function (prev, curr) {
		if (prev[curr.how]) {
	    	prev[curr.how] += 1;
		} else {
	    	prev[curr.how] = 1;
		}
		return prev;
	}, {});

	var indexedByWhen = data.reduce(function (prev, curr) {
		if (prev[curr.when]) {
	    	prev[curr.when] += 1;
		} else {
	    	prev[curr.when] = 1;
		}
		return prev;
	}, {});

	var typeDataType = [];
	var typeDataHow = [];
	var typeDataWhen = [];

	for (var label in indexedByType) {
	  typeDataType.push({label: label, value: indexedByType[label]});
	}

	for (var how in indexedByHow) {
	  typeDataHow.push({label: how, value: indexedByHow[how]});
	}

	for (var when in indexedByWhen) {
	  typeDataWhen.push({label: when, value: indexedByWhen[when]});
	}

  	xTyp.domain([0, d3.max(typeDataType, function(d) { return d.value; })]);
  	xHow.domain([0, d3.max(typeDataHow, function(d) { return d.value; })]);
  	xWhn.domain([0, d3.max(typeDataWhen, function(d) { return d.value; })]);
	
	var pizzaHows = d3.select("#how")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataHow.length * 30 + "px"
		})
	var pizzaHow = d3.selectAll(".pizzaHows")

	
	pizzaHows.selectAll(".pizzaHows")
		.data(typeDataHow)
		.enter().append("div")
		.attr("class", "pizzaHows")

	d3.selectAll(".pizzaHows")
		.append("text")
		.attr("class", "pizzaHowText")
		.text(function(d) { return d.label; })

	d3.selectAll(".pizzaHows")
		.append("text")
		.attr("class", "pizzaHowValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".pizzaHows")
		.append("div")
		.attr("class", "pizzaHow")
		.style({
			"height": "5px",
			"width": function(d) { return xHow(d.value) - 6 + "px"; }
		})

	var pizzaWhens = d3.select("#when")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataWhen.length * 30 + "px"
		})
	var pizzaWhen = d3.selectAll(".pizzaWhens")

	pizzaWhens.selectAll(".pizzaWhens")
		.data(typeDataWhen)
		.enter().append("div")
		.attr("class", "pizzaWhens")

	d3.selectAll(".pizzaWhens")
		.append("text")
		.attr("class", "pizzaWhenText")
		.text(function(d) { return d.label; })

	d3.selectAll(".pizzaWhens")
		.append("text")
		.attr("class", "pizzaWhenValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".pizzaWhens")
		.append("div")
		.attr("class", "pizzaWhen")
		.style({
			"height": "5px",
			"width": function(d) { return xWhn(d.value) - 6 + "px"; }
		})


	var pie = d3.layout.pie()
		.sort(null)
	    .value(function(d) { return d.value; });

	var w = 636;
	var h = 310;
	var center = 636 / 2;
	var radius = Math.min(w, h) / 2;
	var outerRadius = 100;
	var innerRadius = 0;

	var key = function(d){ return d.data.label; };

	//Create SVG element
	var svg = d3.select("svg#type")
		.attr("width", w)
		.attr("height", h)
		.append("g")

	svg.attr("transform", "translate(" + center + ", " + center / 2 + ")")
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
	    .data(pie(typeDataType))
	    .enter()
	    .append("g")
	    .attr("class", "arc");
	    

	//Set up outter arc groups
	var outterArcs = slice.selectAll("g.outter-arc")
	    .data(pie(typeDataType))
	    .enter()
	    .append("g")
	    .attr("class", "outter-arc");

	//Set up phantom arc groups
	var phantomArcs = slice.selectAll("g.phantom-arc")
	    .data(pie(typeDataType))
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
		.data(pie(typeDataType), key);

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

	// use this to animate the graph
	//text.exit()
		//.remove();

	// Labels line 
	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(typeDataType), key);
	
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

	// use this to animate the graph
	//polyline.exit()
		//.remove();

}