function ingredients(data) {
	
	// Topping aggregated per pizza
	var comp = []

	data.forEach(function(d){
		comp.push({"topping":d.topping.split(", "), "name":d.name})
	})

	var pizzaCompos = d3.select("#comp")

	pizzaCompos.selectAll(".comp")
		.data(comp)
		.enter().append("div")
		.attr("class", "comp col four")
		.html(function(d){
			return "<p>"+ d.name +"</p>"
		})
			.append("p")
			.attr("class", "ciao")
			.html(function(d) { 
				var content = d.topping.reduce(function(content, v) {
					content += "<label class='"+ v.split(" ").join("-") +"'>" + v + "</label>"
					return content
				}, "");
				return content
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
    	.attr("height", 200 + margin.top + margin.bottom)
    	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var pizzaTopping = pizzaToppings.selectAll(".pizzaToppings")
		.data(typeDataTopping)
		.enter()
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
      .attr("transform", "translate(0," + 200 + ")")
      .call(xtAxis);

	pizzaTopping.append("rect")
		.attr("class", "pizzaTopping")
		.attr("width", 5)
		.attr("x", function(d, i) { return i * typeDataTopping.length; })
		.attr("y", function(d) { return 200 - yTpp(d.value); })
		.attr("height", function(d) { return yTpp(d.value); })
		.attr("fill", "#F80404")
		.on("mouseover", function(d) { highlight(d.label); })
		.on("mouseout", function(d) { highlight(null); });

	function highlight(ingredient) {
		if (ingredient == null) d3.select("#comp").selectAll("label").classed("selected", false);
		else d3.select("#comp").selectAll("label." + ingredient.split(" ").join("-")).classed("selected", true);
	}
}
