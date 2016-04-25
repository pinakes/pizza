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
	var typeDataName = [];
	var typeDataHow = [];
	var typeDataWhen = [];

	for (var label in indexedByType) {
	  typeDataType.push({label: label, value: indexedByType[label]});
	}

	for (var name in indexedByName) {
	  typeDataName.push({label: name, value: indexedByName[name]});
	}

	for (var how in indexedByHow) {
	  typeDataHow.push({label: how, value: indexedByHow[how]});
	}

	for (var when in indexedByWhen) {
	  typeDataWhen.push({label: when, value: indexedByWhen[when]});
	}

  	xTyp.domain([0, d3.max(typeDataType, function(d) { return d.value; })]);
  	xNme.domain([0, d3.max(typeDataName, function(d) { return d.value; })]);
  	xHow.domain([0, d3.max(typeDataHow, function(d) { return d.value; })]);
  	xWhn.domain([0, d3.max(typeDataWhen, function(d) { return d.value; })]);

	var pizzaTypes = d3.select("#type")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
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
			"width": thirdWidth + margin.left + margin.right + "px",
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
			"height": "4px",
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
			"height": "4px",
			"width": function(d) { return xWhn(d.value) - 6 + "px"; }
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