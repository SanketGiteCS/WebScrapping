const request = require("request");
const cheerio = require("cheerio");
const chalk = require('chalk');
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",requestCallBack);

const batsmanProfileUrls  = [];

function requestCallBack (err, res, html)
{
    const $ = cheerio.load(html);
    const batsmanAnchorTags = $(".batsman-cell a");
    
    for(let i = 0; i< batsmanAnchorTags.length; i++)
    {
        let name = $(batsmanAnchorTags[i]).text();
        let link = "https://www.espncricinfo.com"+$($(".batsman-cell a")[i]).attr("href");
        batsmanProfileUrls.push({name:name,url:link});
    }

    for (let j in batsmanProfileUrls)
    {
        request(batsmanProfileUrls[j].url,fetchDOB.bind(this,j));
    }
}

 let count = 0;
function fetchDOB(index, err, res, html) 
{
   count++;
   
   const $ = cheerio.load(html);
   const born = ($($(".player-card-description.gray-900")[1]).text()).split(",");
   
   const date = (born[0].split(" "))[1];
   const month = (born[0].split(" "))[0];
   const year = born[1];
   
   batsmanProfileUrls[index]["birthday"]= date+" "+month+year;
   
   if(count==batsmanProfileUrls.length)
   {
       for(let i in batsmanProfileUrls){
        console.log(chalk.green ('Name Of The Player: ' + batsmanProfileUrls[i].name));
        console.log(chalk.yellow ('Date Of Birth : ' + batsmanProfileUrls[i].birthday));
        console.log();
       } 
   } 
   
}