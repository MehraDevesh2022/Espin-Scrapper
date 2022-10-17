// we can't comment into json file :

// manupaltion with json file : with fs module =>
const xlsx = require('xlsx');
const fs = require('fs');

// readfile and manuplate it then write it using writeFile method into example.json file:  

// let buffer = fs.readFileSync('./exampleJson.json');

// // file is read as a buffer formate we need to that to convert as json formate using JSON.parse() method 
// let data = JSON.parse(buffer); // file converted in json formate now


// other method to read file is modularity :

let data = require("./exampleJson.json");

data.push({
    "name": "Thor",
    "last Name" : "God of thunder",
     "age" : 1200,
     "friends" : ['bruce' , "Toney" , "Capten America"],
     "address" : {
        "city" : "asgard",
        "state" : "velhalla"
     }

})

// fs writeFileSync method  write data only in string format first we need to convert data in to string using stringFy method  after that pass that value

// data = JSON.stringify(data)

// fs.writeFileSync("./exampleJson.json", data);
// now data added in to /exampleJson.json file in string forate after word converted into json foramte into file automatically


let newWB = xlsx.utils.book_new();
// add new WorkBook (new sheet added)
let newWS = xlsx.utils.json_to_sheet(data);
// this will take JSON data and convert intp Excel formate
xlsx.utils.book_append_sheet(newWB, newWS, "AvengerData");
// this will add new sheet and and make it also named added that perticulaer sheet name 
xlsx.writeFile(newWB, "mySheet.xlsx");
// this will write workBook and provide the file name