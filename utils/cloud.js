var Canvas = require("canvas");
var cloud = require("d3-cloud");
var d3 = require('d3');
var jsdom = require('jsdom');
var fs = require('fs');
const { JSDOM } = jsdom;
var document = (new JSDOM(`<body><body>`)).window.document;

const layout = [960, 500];
const fill = d3.scaleLinear()  
.domain([10, 500])  
.range([0, 1]); 
module.exports = function (words, callback) {
    cloud()
        .size(layout)
        .canvas(function() {
            return new Canvas(1, 1);
        })
        .words(words)
        .padding(5)
        .rotate(function() {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(function(d) {
            return d.size;
        })
        .on("end", draw)
        .start();
}
function draw(words) {
    console.log(words);
    d3.select(document.body).append("svg")
        .attr("width", layout[0])
        .attr("height", layout[1])
      .append("g")
        .attr("transform", "translate(" + layout[0] / 2 + "," + layout[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i)})
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
    .text(function(d) { return d.text; });
    fs.writeFileSync('./data/cloud.svg', document.body.innerHTML);
}

// var words = [
//     "Hello",
//     "world",
//     "normally",
//     "you",
//     "want",
//     "more",
//     "words",
//     "than",
//     "this"
// ].map(function(d) {
//     return { text: d, size: 10 + Math.random() * 90 };
// });

// function end(words) {
//     console.log(JSON.stringify(words));
// }
