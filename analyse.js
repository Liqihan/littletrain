const fs = require('fs');
const jieba = require('nodejieba');
const _ = require('lodash');
const dirList = fs.readdirSync('./images');
const topN = 5;
const keyWordMap = {};


dirList.map(dir => {
    var words = jieba.extract(dir, topN);
    for ( {word, weight} of words) {
        word = word.toLowerCase();
        if (word in keyWordMap) {
            keyWordMap[word] += weight;
        } else {
            keyWordMap[word] = weight;
        }
    }
})
const result = Object.keys(keyWordMap).sort((a, b) => {
    return keyWordMap[a] < keyWordMap[b];
}).map((key) => ({
    text: key,
    size: keyWordMap[key]
}))
console.log(result);
fs.writeFileSync('data/result.json', JSON.stringify(result), 'utf8')
