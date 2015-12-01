var margin = {top: 50, right: 0, bottom: 50, left: 0},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var aspect = width / height,
    chart = d3.select('#chart');
d3.select(window)
	.on("resize", function() {
		var targetWidth = chart.node().getBoundingClientRect().width;
		chart.attr("width", targetWidth);
		chart.attr("height", targetWidth / aspect);
});

var parseDate = d3.time.format("%d-%m-%Y").parse;

var y = d3.scale.ordinal().rangeRoundBands([height, 0]);

var x = d3.time.scale()
    .domain([new Date(2015, 10, 15), new Date(2016, 10, 15)])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(3)
    .tickSize(3, 0)

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(width)
    .orient("right");



function customAxis(g) {
	 g.selectAll("text")
	     .attr("x", 4)
	     .attr("dy", -4);
}

d3.csv('http://docs.google.com/spreadsheet/pub?key=1JL9GyvZk0Nkkku0mu92uOEDXm9X7sPLNjMJcshDCHZQ&single=true&output=csv', function(error, data) {
	data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

	console.log(data);

	y.domain(data.map(function(d) { return d.type; }))

	var svg = d3.select("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.selectAll(".pizza")
		.data(data)
		.enter().append("circle")
		.attr("class", "pizza")
		.attr("r", function(d) { return d.vote * 3; })
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.type); })
		.style({
			"fill": "#F80404",
			"stroke": "#F1D622",
			"stroke-width": 3
		}).append("circle")
			.attr("class", "mozzarella")
			.attr("r", 1)
			.attr("cx", 2)
			.attr("cy", 2)
			.style("fill", "#fff")

	var gy = svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .call(customAxis);

	var gx = svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
});