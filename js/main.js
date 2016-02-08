
// Settings
var key = "1JL9GyvZk0Nkkku0mu92uOEDXm9X7sPLNjMJcshDCHZQ",  // key for demo spreadsheet
    query = "&tqx=out:csv",                       // query returns the first sheet as CSV
    csvUrl = "https://spreadsheets.google.com/tq?key=" + key + query;  // CORS-enabled server

// Timeline
var margin = {top: 50, right: 0, bottom: 50, left: 0},
    width = 960 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%m-%Y").parse;

var yTml = d3.scale.ordinal().rangeRoundBands([height, 0]);

var xTml = d3.time.scale()
    .domain([new Date(2015, 10, 1), new Date(2016, 10, 15)])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(xTml)
    .orient("bottom")
    .ticks(3)
    .tickSize(3, 0)

var yAxis = d3.svg.axis()
    .scale(yTml)
    .tickSize(width)
    .orient("right");

function customAxis(g) {
	 g.selectAll("text")
	     .attr("x", 4)
	     .attr("dy", -4);
}

// Type
var halfWidth = 440

var xTyp = d3.scale.linear()
    .range([0, halfWidth]);

var xNme = d3.scale.linear()
    .range([0, halfWidth]);

d3.csv(csvUrl, function(error, data) {
	data.forEach(function(d) {
        d.date = parseDate(d.date);
    });
    // add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
	    .attr("class", "tooltip")
	    .style("opacity", 0);

	console.log(data);

	// Timeline
	timeline(data, tooltip);

	// Quantity
	quantity(data);

	// Type
	type(data, tooltip);
	
});