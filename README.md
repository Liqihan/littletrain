# littletrain

## 基于爬虫 + 数据分析 + 可视化展示



### USAGE

```
Usage: node app.js [options]

Options:

  -h, --help                output usage information
  -V, --version             output the version number
  -i, --id                  自定义抓取的页面ID
  -p, --pageIndex           自定义抓取的起始页。 默认值第一页
  -f, --offset              自定义抓取的页面数量
```



### STEP1

node爬虫，参考usage,爬取的图片保存到`images`目录下

```javascript
node app.js -p 3 //爬取第三页的
```



### STEP2

数据分析，先对目录标题进行分词，然后根据权重统计出高频词汇，统计出的数据导出到`data/result.json`, 生成词云和柱状图

```javascript
node analyse.js
```



### STEP3

根据统计的结构生成新的js，启动静态服务，即可展示页面

```javascript
webpack
```

