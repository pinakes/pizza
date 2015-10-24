function draw(data) {
    console.log(data)
	d3.select("body")
		.append("div")
			.attr("class", "chart")
		.selectAll(".bar")
		.data(data)
		.enter()
		.append("div")
			.attr("class", "bar")
			.style("width", function(d) {return d.beers * 50 + 8 + "px"})
			.text(function(d) { return d.beers });
}

d3.csv('http://docs.google.com/spreadsheet/pub?key=1aN_-Z0lNNCcWahCyiCs5YdkmchXoviB-4ukLVDmmQNs&single=true&output=csv', draw);