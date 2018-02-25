const fs = require("fs");
const jieba = require("nodejieba");
const _ = require("lodash");
const { createDir } = require("./utils");
const dirList = fs.readdirSync("./images");
const topN = 5;
const keyWordMap = {};

dirList.map(dir => {
    var words = jieba.extract(dir, topN);
    for ({ word, weight } of words) {
        weight = parseInt(weight);
        word = word.toLowerCase();
        if (word in keyWordMap) {
            keyWordMap[word] += weight;
        } else {
            keyWordMap[word] = weight;
        }
    }
});
const unsort = Object.keys(keyWordMap).map(key => ({
    text: key,
    size: keyWordMap[key]
}));
const result = _.take(_.sortBy(unsort, function(d) {
    return -d.size;
}), 50);
console.log(result);
createDir("./data").then(() => {
    fs.writeFileSync("data/unsortResult.json", JSON.stringify(unsort), "utf8");
    fs.writeFileSync("data/result.json", JSON.stringify(result), "utf8");
});
