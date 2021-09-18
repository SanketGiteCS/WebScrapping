const request = require('request');
const cheerio = require('cheerio');
const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score';

request(url,callBack);

function callBack(error,response,html){

    if(error){
        console.error('error : ',error);
    }else{
      
        extractHTML(html);
    }
}

function extractHTML(html){

    let $ = cheerio.load(html);
    losingTeam = $(".team-gray .name-link p").text();
    const bothTeamObject = $(".name-link p");
    const bothTeamScoreObject = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .score");
    const winningTeamNameScoreArray = $(bothTeamObject[0]).text() == losingTeam ? [$(bothTeamObject[1]).text() , $(bothTeamScoreObject[1]).text()] : [$(bothTeamObject[0]).text() , $(bothTeamScoreObject[0]).text()];
    console.log(winningTeamNameScoreArray);

    
} 