const request = require("request");
const cheerio = require("cheerio");
const { processScoreCard } = require("./scoreCard");


function getAllMatches(fullLink) {
  request(fullLink, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      getExtractAllLinks(html);
    }
  });
}

function getExtractAllLinks(html) {
  let $ = cheerio.load(html);

  let anchorElm = $(
    ".ds-flex .ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent>a"
  );
  let link = null;
  for (let i = 0; i < anchorElm.length; i++) {
    link = $(anchorElm[i]).attr("href");
    let fullLink = "https://www.espncricinfo.com/" + link;

    // call the scoreCard function to get all match scrore detials using these match links :
    processScoreCard(fullLink); // each time one macth link passed out of 60 match
  }
}

module.exports = {
  getAllMatches,
};

