import * as d3 from "d3";
const fill = d3.schemeCategory20;
const layout = [500, 500];
export const drawCloud = words => {
    d3
        .select("body")
        .append("svg")
        .attr("width", layout[0])
        .attr("height", layout[1])
        .append("g")
        .attr(
            "transform",
            "translate(" + layout[0] / 2 + "," + layout[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function(d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
            return fill[i % 20];
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) {
            return d.text;
        });
};
// 画柱状图
export const drawHistgram = (data, options) => {
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = 800,
        height = 500 - margin.top - margin.bottom;
    // 容器
    var max = d3.max(data, d => d.size);
    var chart = d3
        .select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr(
            "transform",
            "translate(" + margin.left + ", " + margin.top + ")"
        );
    // 画柱状图
    var barWidth = width / data.length;
    var bar = chart
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        // 接收一个数据填充一个g元素
        // 同时为g设置位置
        .attr("transform", function(d, i) {
            return "translate(" + i * barWidth + ", 0)";
        });
    // 添加坐标轴
    var x = d3
        .scaleLinear()
        .domain([data.length, 0])
        .rangeRound([width, 0]);
    // 添加坐标轴
    var y = d3
        .scaleLinear()
        .domain([0, max])
        .rangeRound([height, 0]);
    bar
        .append("rect")
        // 添加一个矩形
        .transition()
        .delay(function(d, i) {
            return i * 500;
        })
        .duration(500)
        .attr("y", function(d) {
            return y(d.size);
        })
        .attr("height", function(d) {
            return height - y(d.size);
        })
        .attr("fill", "#2177BB")
        .attr("width", barWidth - 1);
    bar
        .append("text")
        .attr("y", function(d) {
            return y(d.size);
        })
        .attr("dy", -5)
        .attr("x", function(d, i) {
            return (x(i) - x(i - 1)) / 2;
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.text;
        });
    var xAxis = d3.axisBottom().scale(x);
    var yAxis = d3
        .axisLeft()
        .scale(y)
        .ticks(5);
    // 添加x坐标轴
    chart
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    // 添加y坐标轴
    chart
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);
};
