const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

  const request = require('request');
  const cheerio = require('cheerio');


  request(url , cb);
  
  function cb(error , response , html){
   if(error){
    console.log(error);
   }else{
    getScore(html);

   }
}

function getScore(html){
let $ =  cheerio.load(html);
// get venu and date of match :
let data = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
let getData = $(data).text();

// convert str to array  geting venu and date sapreatly

getData = getData.split(',');
let venu = getData[1].trim();
let date = getData[2].trim();

// now get result of the match : =>
let result = $(
  ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
).text();


console.log(venu);
console.log(date);
console.log(result);

let innings = $(
  ".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table"
);

let scoreCard =''
for(let i=0; i<innings.length; i++){
 scoreCard += $(innings[i]).html();
}
console.log(scoreCard);
}


