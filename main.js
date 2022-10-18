const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { getAllMatches } = require("./getAllMatchLinks");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

let iplPath = path.join(__dirname, "IPL");
iplDir(iplPath);

request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.log(error);
  } else {
    extractLink(html);
  }
}
function extractLink(html) {
  let $ = cheerio.load(html);

  let anchorElm = $(".ds-border-t.ds-border-line.ds-text-center.ds-py-2 a");

  let link = anchorElm.attr("href");

  const fullLink = "https://www.espncricinfo.com/" + link;
  // console.log(fullLink);

  getAllMatches(fullLink);
}


function iplDir(iplPath) {
  if (fs.existsSync(iplPath) == false) {
    fs.mkdirSync(iplPath);
  }
 
}
