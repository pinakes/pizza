var margin = {top: 20, right: 0, bottom: 20, left: 0},
    width = 320 - margin.left - margin.right,
    height = 2940 - margin.top - margin.bottom;


var parseDate = d3.time.format("%d-%m-%Y").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width]);

var y = d3.time.scale()
    .domain([new Date(2015, 10, 15), new Date(2016, 10, 15)])
    .range([0, height]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right")
    .ticks(3)
    .tickSize(3, 0)

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(height)
    .orient("bottom");

d3.csv('http://docs.google.com/spreadsheet/pub?key=1JL9GyvZk0Nkkku0mu92uOEDXm9X7sPLNjMJcshDCHZQ&single=true&output=csv', function(error, data) {
	data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

	console.log(data);

	x.domain(data.map(function(d) { return d.type; }))

	var svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")

	svg.selectAll(".pizza")
		.data(data)
		.enter().append("circle")
		.attr("class", "pizza")
		.attr("r", function(d) { return d.vote * 3; })
		.attr("cy", function(d) { return y(d.date); })
		.attr("cx", function(d) { return x(d.type); })
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

 	console.log(x(data.type))

	var gx = svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0, 0)")
	    .call(xAxis);

	var gy = svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis);
});
