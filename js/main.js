
/* Settings
var key = "1JL9GyvZk0Nkkku0mu92uOEDXm9X7sPLNjMJcshDCHZQ",  // key for demo spreadsheet
    query = "&tqx=out:csv",                       // query returns the first sheet as CSV
    csvUrl = "https://spreadsheets.google.com/tq?key=" + key + query;  // CORS-enabled server
*/
// Timeline
var margin = {top: 50, right: 0, bottom: 50, left: 0},
    width = 960 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%m-%Y").parse;

var yTml = d3.scale.ordinal().rangeRoundBands([height, 0]);

var xTml = d3.time.scale()
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(xTml)
    .orient("bottom")
    .ticks(12)
    .tickSize(2, 0)

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
var thirdWidth = 310

var xTyp = d3.scale.linear()
    .range([0, thirdWidth]);

var xNme = d3.scale.linear()
    .range([0, thirdWidth]);

var xHow = d3.scale.linear()
    .range([0, thirdWidth]);

var xWhn = d3.scale.linear()
    .range([0, thirdWidth]);

function sheetLoaded(data) {
    data = data.feed.entry.map(function (entry) {
        return {
            date:       entry['gsx$date']['$t'],
            name:       entry['gsx$name']['$t'],
            vote:       entry['gsx$vote']['$t'],
            type:       entry['gsx$type']['$t'],
            city:       entry['gsx$city']['$t'],
            lat:        entry['gsx$lat']['$t'],
            longi:      entry['gsx$longi']['$t'],
            topping:    entry['gsx$topping']['$t'],
            when:       entry['gsx$when']['$t'],
            withwho:    entry['gsx$withwho']['$t'],
            how:        entry['gsx$how']['$t']
        }
    })
    data.forEach(function(d) {
        d.date = parseDate(d.date);
    })
    //console.log("data length: " + data.length)
    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Pizza Counter
    d3.select(".totPizza").text(data.length)

    // Full Graph
    fullgraph(data, tooltip);

    // Timeline
    //timeline(data, tooltip);

    // Quantity
    quantity(data);

    // Type
    type(data, tooltip);

    // world
    d3.json("map/world_map.json", function(error, topology) {
        world(topology, data, tooltip);
    });

    // how
    //how(data, tooltip);
}