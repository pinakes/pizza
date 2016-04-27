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

	
}
