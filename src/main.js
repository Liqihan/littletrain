import * as d3 from "d3";
import cloud from "d3-cloud";
import result from "../data/result.json";
import { drawCloud, drawHistgram } from "./draw";
const layout = [500, 500];

var wordCloud = cloud()
    .size([500, 500])
    .words(
        result.map(function(d) {
            return { text: d.text, size: d.size * 5, test: "haha" };
        })
    )
    .padding(5)
    .rotate(function() {
        return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function(d) {
        return d.size;
    })
    .on("end", drawCloud).start();

    
drawHistgram(result);
