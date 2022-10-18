// temp url for testing :
// const url =
//   "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const { log } = require("console");
// this function called from getAllMatch module :
function processScoreCard(url) {
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
  let venue = getData[1];
  let date = getData[2].trim();

  // now get result of the match : =>
  let result = $(
    ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
  ).text();

  // console.log(venue);
  // console.log(date);
  // console.log(result);

  let innings = $(".ds-rounded-lg.ds-mt-2");
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

   
    let cInings = $(innings[i]); 

    let rowData = cInings.find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table>tbody tr");

    // console.log( `--------------------------------- ${teamName} -------------------------------------------`);

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

        // now make dir inside of ipl dir for each team :
        storeData(
          teamName,
          oppenentName,
          playerName,
          runs,
          balls,
          four,
          six,
          str,
          date
        );

        // console.log(
        //   `PlayerName :${playerName}  || Runs : ${runs}  || Balls ${balls}  || Fours : ${four}  || Sixes : ${six}  || Strike-Rate : ${str}`
        // );
      }
    }
  }
}

function storeData(
  teamName,
  oppenentName,
  playerName,
  runs,
  balls,
  four,
  six,
  str,
  date
) {
  let teamPath = path.join(__dirname, "IPL", teamName);
  iplDir(teamPath);

 let filePath = path.join(teamPath, playerName + ".xlsx");
// console.log(filePath);
 let readContent = excelReader(filePath, playerName);

 let objData = {
   teamName,
   oppenentName,
   playerName,
   runs,
   balls,
   four,
   six,
   str,
   date,
 };

 readContent.push(objData);
 excelWriter(filePath,playerName,readContent);


}

function iplDir(teamPath) {
  if (fs.existsSync(teamPath) == false) {
    fs.mkdirSync(teamPath);
  }}

function excelWriter(filePath, sheetName, jsonData) {
  let newWB = xlsx.utils.book_new();
  // add new WorkBook (new sheet added)
  let newWS = xlsx.utils.json_to_sheet(jsonData);
  // this will take JSON data and convert intp Excel formate
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  // this will add new sheet and and make it also named added that perticulaer sheet name
  xlsx.writeFile(newWB, filePath);
  // this will write workBook and provide the file name
}

// now its time read data using xlsx module =>
function excelReader(filePath, sheetName) {
  if (fs.existsSync(filePath) == false) {
    console.log("heelo");
    return [];
     
    
  }
  console.log("heelo");
  let wb = xlsx.readFile(filePath);
  // which excel book to read
  let excelData = wb.Sheets[sheetName];
  // which sheet to read from excel workbook
  let ans = xlsx.utils.sheet_to_json(excelData);
  // converting excel data to json formate
  return ans;
}

module.exports ={
  processScoreCard
}
