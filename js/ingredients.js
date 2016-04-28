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
