function ingredients(data, tooltip) {
	
	// Topping aggregated per pizza
	var comp = [] 

	data.forEach(function(d){
		comp.push({"topping":d.topping.split(", "), "name":d.name, "city":d.city, "date":d.date, "vote":d.vote})
	})

	var shortDate = d3.time.format("%d %b %y, %a"); 
	var pizzaCompos = d3.select("#comp")

	pizzaCompos.selectAll(".comp")
		.data(comp.reverse())
		.enter().append("div")
		.attr("class", "comp row")
		.html(function(d){
			return "<div class='col two'><span class='light'>"+ shortDate(d.date) +"</span> - "+ d.name +" - <i>"+ d.city +"</i></div>"
		})
			.append("div")
			.attr("class", "col two")
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
	yTpp.domain([0, d3.max(typeDataTopping, function(d) { return d.value ; })]);	

	console.log(d3.max(typeDataTopping, function(d){ return d.value; }))

	var pizzaToppings = d3.select("#topping")
		.attr("width", width + margin.left + margin.left)
    	.attr("height", heightBars + margin.top + margin.bottom)

	var bar = pizzaToppings.selectAll("g")
		.data(typeDataTopping.sort(function(a, b) { return b.value - a.value; }))
		.enter()
    	.append("g")
	    .attr("transform", "translate(0," + margin.top + ")");
	
	bar.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightBars + ")")
      .call(xtAxis);

	bar.append("rect")
		.attr("class", function(d){ return "pizzaTopping " + d.label.split(" ").join("-") })
		.attr("x", function(d, i) { return i * ((width + margin.left) / typeDataTopping.length); })
     	.attr("width", width / typeDataTopping.length - 2)
		.attr("y", function(d) { return yTpp(d.value); })
		.attr("height", function(d) { return heightBars - yTpp(d.value); })
		//.attr("fill", "#F80404")
		.on("mouseover", function(d) { 
			highlight(d.label); 
			tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html(d.label)
               .style({
               		
	               	"left": (d3.event.pageX) + "px",
	               	"top": (d3.event.pageY - 40) + "px"
               })
		})
		.on("mouseout", function(d) { 
			highlight(null); 
			tooltip.transition()
               .duration(500)
               .style("opacity", 0);
		});

	bar.append("text")
		.text(function(d) { return d.value; })
		.attr("class", "barText")
		.attr("text-anchor", "middle")
		.attr("fill", "#fff")
		.attr("x", function(d, i) { return i * ((width + margin.left) / typeDataTopping.length) + (width / typeDataTopping.length - 2 ) / 2; })
		.attr("y", function(d) { return yTpp(d.value) + 14; });

	function highlight(ingredient) {
		if (ingredient == null){
			d3.select("#comp").selectAll("label").classed("selected", false);
		}
		else {
			d3.select("#comp").selectAll("label." + ingredient.split(" ").join("-")).classed("selected", true);
		}
	}

	//stupid function I know
	function ratings(number) {
		var stars = number.toString();

		stars.replace(".", "-");
	}
}
