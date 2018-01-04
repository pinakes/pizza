function fullgraph(data, tooltip) {

	var perMonth = d3.nest()
		.key(function(d) { return d3.time.month(d.date); })
		.entries(data);

	var formatMonth = d3.time.format("%B");

	yTml.domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	xTml.domain([new Date(2015, 9, 1), new Date(2018, 3, 15)])

	console.log("ciao")

	var timeline = d3.select("#timeline")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
	    .attr("transform", "translate(" + margin.left + ", 20)");

	var gy = timeline.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .call(customAxis);

	var gx = timeline.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	var toolTipDate = d3.time.format("%a, %d %b");

	var line = d3.svg.line()
	    .x(function(d) { return xTml(d3.time.month(d.values[0].date)); })
	    .y(function(d) { return yTml(d.values.length); });

	timeline.append("path")
		.datum(perMonth)
		.attr("class", "line")
		.attr("d", line)
		.style({
			"fill": "none",
			"stroke": "red",
			"stroke-width": "1.5px"
		})

	timeline.selectAll(".pizza")
		.data(perMonth)
		.enter().append("circle")
		.attr("class", "pizza")
		.attr("r", 6)
		.attr("cx", function(d) { return xTml(d3.time.month(d.values[0].date)); })
		.attr("cy", function(d) { return yTml(d.values.length); })
		.on("mouseover", function(d) {
			var content = d.values.reduce(function(content, v) {
				content += "<h4><small>"+ v.name +" - "+ v.city +"</small></h4><i>"+ v.type +" / "+ v.vote +" stars</i><br/><br/>"
				return content
			}, "");

        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html("<h4>"+ d.values.length + plural(d.values.length) +" in "+ formatMonth(d.values[0].date) +"</h4><hr>"+ content)
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX + 20) + "px",
	               	"top": (d3.event.pageY - 100) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	})
      	.on("click", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});
}