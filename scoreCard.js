// temp url for testing :
// const url =
//   "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");

// this function called from getAllMatch module :
function processScoreCard(url){
request(url, cb);
}


function cb(error, response, html) {
  if (error) {
    console.log(error);
  } else {
    getScore(html);
  }
}

function getScore(html) {
  let $ = cheerio.load(html);
  // get venue and date of match :
  let data = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
  let getData = $(data).text();

  // convert str to array  geting venue and date sapreatly

  getData = getData.split(",");
  let venue = getData[1].trim();
  let date = getData[2].trim();

  // now get result of the match : =>
  let result = $(
    ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
  ).text();

  console.log(venue);
  console.log(date);
  console.log(result);
  console.log("-------------------------------------------------");

  let innings = $(".ds-rounded-lg.ds-mt-2");
  console.log(innings.length);
  let htmlStr = "";
  for (let i = 0; i < innings.length; i++) {
    htmlStr += $(innings[i]).html();
    let teamName = $(innings[i])
      .find(".ds-text-title-xs.ds-font-bold.ds-capitalize")
      .text();

    let oppenentName = i == 0 ? 1 : 0;
    oppenentName = $(innings[oppenentName])
      .find(".ds-text-title-xs.ds-font-bold.ds-capitalize")
      .text();

    console.log(
      `venue : ${venue}  date : ${date} teams : ${teamName} vs ${oppenentName}`
    );

    let cInings = $(innings[i]); //.ds-w-0

    let rowData = cInings.find(
      ".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table>tbody tr"
    );

  console.log(`--------------------------------- ${teamName} -------------------------------------------\n`);

    for (let j = 0; j < rowData.length; j++) {
      let tableCol = $(rowData[j]).find("td");
      let isWorthy = $(tableCol[0]).hasClass("ds-w-0");

      if (isWorthy == true) {
        let playerName = $(tableCol[0]).text().trim();
        let runs = $(tableCol[2]).text().trim();
        let balls = $(tableCol[3]).text().trim();
        let four = $(tableCol[5]).text().trim();
        let six = $(tableCol[6]).text().trim();
        let str = $(tableCol[7]).text().trim();

        console.log(
          `PlayerName :${playerName}  || Runs : ${runs}  || Balls ${balls}  || Fours : ${four}  || Sixes : ${six}  || Strike-Rate : ${str}`
        );
      }
    }
  }
}


module.exports = {
  processScoreCard,
};