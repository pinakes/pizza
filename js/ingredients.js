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

	xTpp.domain([0, d3.max(typeDataTopping, function(d) { return d.value; })]);


	var pizzaToppings = d3.select("#topping")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
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
		.on("mouseover", function(d) { highlight(d.label); })
		.on("mouseout", function(d) { highlight(null); })

	function highlight(ingredient) {
		if (ingredient == null) d3.select("#comp").selectAll("label").classed("selected", false);
		else d3.select("#comp").selectAll("label." + ingredient.split(" ").join("-")).classed("selected", true);
	}
}
