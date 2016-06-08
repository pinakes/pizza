function ingredients(data, tooltip) {
	
	// Topping aggregated per pizza
	var comp = []

	data.forEach(function(d){
		comp.push({"topping":d.topping.split(", "), "name":d.name, "city":d.city})
	})

	var pizzaCompos = d3.select("#comp")

	pizzaCompos.selectAll(".comp")
		.data(comp)
		.enter().append("div")
		.attr("class", "comp row")
		.html(function(d){
			return "<div class='col four'>"+ d.name +" - <span class='light'>"+ d.city +"</div>"
		})
			.append("div")
			.attr("class", "col five")
			.html(function(d) { 
				var content = d.topping.reduce(function(content, v) {
					content += "<label class='"+ v.split(" ").join("-") +"'>" + v + "</label>"
					return content
				}, "");
				return content
				})
				
	pizzaCompos.selectAll(".comp").selectAll("label")
		.on("mouseover", function(d){ 
			d3.select(".pizzaTopping."+this.className).classed("selected", true);
		})
		.on("mouseout", function(d){
			d3.selectAll(".pizzaTopping").classed("selected", false);
		})


	// Topping aggregated per ingredient
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

    xTpp.domain(data.map(function(d) { return d.label; }));
	yTpp.domain([0, d3.max(typeDataTopping, function(d) { return d.value; })]);	

	var pizzaToppings = d3.select("#topping")
		/*.style({
			"height": thirdWidth + margin.left + margin.right + "px"
			"width": typeDataTopping.length + "px"
		})*/
		.attr("width", width + margin.left + margin.right)
    	.attr("height", heightBars + margin.top + margin.bottom)
    	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	/*
	pizzaTopping
		.append("text")
		.attr("class", "pizzaToppingText")
		.text(function(d) { return d.label; });

	pizzaTopping
		.append("text")
		.attr("class", "pizzaToppingValue")
		.text(function(d) { return d.value; });
	*/
	pizzaToppings.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightBars + ")")
      .call(xtAxis);

    pizzaToppings.append("g")
      .attr("class", "y axis")
      .call(ytAxis)

	pizzaToppings.selectAll("pizzaTopping")
		.data(typeDataTopping)
		.enter().append("rect")
		.attr("class", function(d){ return "pizzaTopping " + d.label.split(" ").join("-") })
		.attr("x", function(d, i) { return i * (width / typeDataTopping.length); })
     	.attr("width", width / typeDataTopping.length - 2)
		.attr("y", function(d) { return yTpp(d.value); })
		.attr("height", function(d) { return heightBars - yTpp(d.value); })
		//.attr("fill", "#F80404")
		.on("mouseover", function(d) { 
			highlight(d.label); 
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
			highlight(null); 
			tooltip.transition()
               .duration(500)
               .style("opacity", 0);
		});

	pizzaToppings.selectAll("text")
		.data(typeDataTopping)
		.enter().append("text")
		.text(function(d) { return d.value; })
		.attr("text-anchor", "middle")
		.attr("fill", "#fff")
		.attr("x", function(d, i) { return i * (width / typeDataTopping.length) + (width / typeDataTopping.length - 2 ) / 2; })
		.attr("y", function(d) { return heightBars - (d.value * 20) + 14; });

	function highlight(ingredient) {
		if (ingredient == null){
			d3.select("#comp").selectAll("label").classed("selected", false);
		}
		else {
			d3.select("#comp").selectAll("label." + ingredient.split(" ").join("-")).classed("selected", true);
		}
	}
}
