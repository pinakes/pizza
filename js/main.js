
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
    .domain([new Date(2015, 9, 15), new Date(2016, 11, 15)])
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
var TypWidth = 480 - margin.left - margin.right

var xTyp = d3.scale.linear()
    .range([0, TypWidth]);

d3.csv(csvUrl, function(error, data) {
	data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

	console.log(data);

	// Timeline

	// add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

	yTml.domain(data.map(function(d) { return d.type; }))

	var timeline = d3.select("#timeline")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var toolTipDate = d3.time.format("%a, %d %b");
	timeline.selectAll(".pizza")
		.data(data)
		.enter()
		/*
		.append("circle")
		.attr("class", "pizza")
		.attr("r", function(d) { return d.vote * 3; })
		.attr("cx", function(d) { return xTml(d.date); })
		.attr("cy", function(d) { return yTml(d.type); })*/
		.append("svg:image")
		.attr("x", function(d) { return xTml(d.date) - 20; })
		.attr("y", function(d) { return yTml(d.type) - 20; })
		.attr('width', 40)
   		.attr('height', 40)
   		.attr("xlink:href","images/pizza.png")
		.on("mouseover", function(d) {
        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html(d.name + "<br/><hr><i>" + d.location + "<br/>" + toolTipDate(d.date) +"</i>")
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX) + "px",
	               	"top": (d3.event.pageY - 100) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});

	var gy = timeline.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .call(customAxis);

	var gx = timeline.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);


	// Type

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var typeData = [];

	for (var label in indexedByType) {
	  typeData.push({label: label, value: indexedByType[label]});
	}

	console.log(typeData.length);

  	xTyp.domain([0, d3.max(typeData, function(d) { return d.value; })]);

	var pizzaType = d3.select("#type")
		.style({
			"width": TypWidth + margin.left + margin.right + "px",
			"height": typeData.length * 19 + "px"
		})

	pizzaType.selectAll(".pizzaType")
		.data(typeData)
		.enter().append("div")
		.attr("class", "pizzaType")
		.style({
			"height": "18px",
			"width": function(d) { return xTyp(d.value) + "px"; }
		})
		.attr("y", function (d, i) {
            return i * 19;
        })
		.text(function(d) { return d.value; })
		.on("mouseover", function(d) {
        	tooltip.transition()
            	.duration(200)
            	.style("opacity", .9);
        	tooltip.html(d.label)
            	.style({
	               	"left": (xTyp(d.value)) + 42 + "px",
	               	"top": (d3.event.pageY - 42) + "px"
               	})
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});
});