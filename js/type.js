function type(data, tooltip) {

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var typeData = [];

	for (var label in indexedByType) {
	  typeData.push({label: label, value: indexedByType[label]});
	}

  	xTyp.domain([0, d3.max(typeData, function(d) { return d.value; })]);

	var pizzaType = d3.select("#type")
		.style({
			"width": TypWidth + margin.left + margin.right + "px",
			"height": typeData.length * 19 + "px"
		})

	pizzaType.selectAll(".pizzaType")
		.data(typeData)
		.enter().append("div")
		.attr("class", "pizzaType")
		.style({
			"height": "18px",
			"width": function(d) { return xTyp(d.value) + "px"; }
		})
		.attr("y", function (d, i) {
            return i * 19;
        })
		.text(function(d) { return d.value; })
		.on("mouseover", function(d) {
        	tooltip.transition()
            	.duration(200)
            	.style("opacity", .9);
        	tooltip.html(d.label)
            	.style({
	               	"left": (xTyp(d.value)) + 42 + "px",
	               	"top": (d3.event.pageY - 42) + "px"
               	})
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});
}