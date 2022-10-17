const request = require('request');
const cheerio = require('cheerio');
const {getAllMatches} = require('./getAllMatchLinks')
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

// initial url passed espncricinfo site and callback function as well :
request(url ,cb);

function cb(error , response , html) {
    if(error){
        console.log(error);
    }else{
      // extractLink function provide use link of result page using html scrapped using initial url 
      extractLink(html);
    }

}
function extractLink(html){
  // $ as selectorTool (all function and peoprty of cheerio now inside the $ with html of espin home page)
  let $ = cheerio.load(html);
  // we are url="https://www.espncricinfo.com/series/ipl-2020-21-1210595" here now  we want access result page for that we need to extract that link of result page from inside of  (anchor tag) a<'href' ="result link">
  let anchorElm = $(".ds-border-t.ds-border-line.ds-text-center.ds-py-2 a"); // complete elemnt of anchor tag

  let link = anchorElm.attr("href"); // extracting the link using attr(attribute) method and getting data of 'href'

  // now combine the  link for completeing the path of homepage + result page
  const fullLink = "https://www.espncricinfo.com/" + link;

  // now get all macthes using that link :

  getAllMatches(fullLink);
}


