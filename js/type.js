function type(data, tooltip) {

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var indexedByName = data.reduce(function (prev, curr) {
		if (prev[curr.name]) {
	    	prev[curr.name] += 1;
		} else {
	    	prev[curr.name] = 1;
		}
		return prev;
	}, {});

	var typeDataType = [];
	var typeDataName = [];

	for (var label in indexedByType) {
	  typeDataType.push({label: label, value: indexedByType[label]});
	}

	for (var name in indexedByName) {
	  typeDataName.push({label: name, value: indexedByName[name]});
	}

  	xTyp.domain([0, d3.max(typeDataType, function(d) { return d.value; })]);
  	xNme.domain([0, d3.max(typeDataName, function(d) { return d.value; })]);

	var pizzaTypes = d3.select("#type")
		.style({
			"width": halfWidth + margin.left + margin.right + "px",
			"height": typeDataType.length * 30 + "px"
		})
	var pizzaType = d3.selectAll(".pizzaTypes")

	pizzaTypes.selectAll(".pizzaTypes")
		.data(typeDataType)
		.enter().append("div")
		.attr("class", "pizzaTypes")

	d3.selectAll(".pizzaTypes")
		.append("text")
		.attr("class", "pizzaTypeText")
		.text(function(d) { return d.label; })

	d3.selectAll(".pizzaTypes")
		.append("text")
		.attr("class", "pizzaTypeValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".pizzaTypes")
		.append("div")
		.attr("class", "pizzaType")
		.style({
			"height": "4px",
			"width": function(d) { return xTyp(d.value) - 6 + "px"; }
		})


	var pizzaPlaces = d3.select("#place")
		.style({
			"width": halfWidth + margin.left + margin.right + "px",
			"height": typeDataName.length * 30 + "px"
		})
	var pizzaPlace = d3.selectAll(".pizzaPlaces")

	pizzaPlaces.selectAll(".pizzaPlaces")
		.data(typeDataName)
		.enter().append("div")
		.attr("class", "pizzaPlaces")

	d3.selectAll(".pizzaPlaces")
		.append("text")
		.attr("class", "pizzaPlaceText")
		.text(function(d) { return d.label; })

	d3.selectAll(".pizzaPlaces")
		.append("text")
		.attr("class", "pizzaTypeValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".pizzaPlaces")
		.append("div")
		.attr("class", "pizzaPlace")
		.style({
			"height": "4px",
			"width": function(d) { return xNme(d.value) - 6 + "px"; }
		})




		/*.on("mouseover", function(d) {
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
      	});*/
}