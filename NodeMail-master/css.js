const superagent = require('superagent'); //发送网络请求获取DOM
const cheerio = require('cheerio'); //能够像Jquery一样方便获取DOM节点

const OneUrl = "https://tianqi.moji.com/weather/china/shanghai/jiading-district"; //ONE的web版网站

superagent.get(OneUrl).end(function(err,res){
    if(err){
       console.log(err);
    }
    // let $ = cheerio.load(res.text);
    let threeDaysData = [];
    let weatherTip = "";
    let $ = cheerio.load(res.text);
    $(".forecast .days").each(function(i, elem) {
      const SingleDay = $(elem).find("li");
      threeDaysData.push({
        Day: $(SingleDay[0])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WeatherImgUrl: $(SingleDay[1])
          .find("img")
          .attr("src"),
        WeatherText: $(SingleDay[1])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        Temperature: $(SingleDay[2])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WindDirection: $(SingleDay[3])
          .find("em")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WindLevel: $(SingleDay[3])
          .find("b")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        Pollution: $(SingleDay[4])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        PollutionLevel: $(SingleDay[4])
          .find("strong")
          .attr("class")
      });
    });
    console.log(threeDaysData);
})