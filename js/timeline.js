function timeline(data, tooltip) {

	yTml.domain(data.map(function(d) { return d.type; }))
	xTml.domain([new Date(2015, 10, 1), new Date(2017, 10, 15)])

	console.log("ciao")

	var timeline = d3.select("#timeline")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var gy = timeline.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .call(customAxis);

	var gx = timeline.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	var toolTipDate = d3.time.format("%a, %d %b");
	timeline.selectAll(".pizza")
		.data(data)
		.enter().append("circle")
		.attr("class", "pizza")
		//.attr("r", function(d) { return d.vote * 3; })
		.attr("r", 8)
		.attr("cx", function(d) { return xTml(d.date); })
		.attr("cy", function(d) { return yTml(d.type); })
		.on("mouseover", function(d) {
        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html(d.name + "<br/><hr><i>" + d.city + "<br/>" + toolTipDate(d.date) +"<br/>" + d.vote + " stars</i>")
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX) + "px",
	               	"top": (d3.event.pageY - 100) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});
      	
  	timeline.selectAll(".pizzaVote")
		.data(data)
		.enter().append("text")
		.attr("class", "pizzaVote")
		.attr("x", function(d) { return xTml(d.date) - 5; })
		.attr("y", function(d) { return yTml(d.type) + 3; })
		.attr("fill", "white")
		.style("font-size", "10px")
		.text(function(d) {
			if (d.vote == 5){
		 		return "★"; 
		 	}
		})
}