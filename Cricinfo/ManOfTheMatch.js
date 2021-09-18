//To Find Man Of The Match Of This Match : https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score';

request(url,callBack);

function callBack(error,response,html){

    if(error){
        console.error('error : ',error);
    }else{
       // fs.writeFileSync("temp.html",html);
        extractHTML(html);
    }
}

function extractHTML(html){

    let selectorTool = cheerio.load(html);
    let name = selectorTool(selectorTool('.playerofthematch-name')[0]).text();
    console.log(name);
    
}