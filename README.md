# cricketbuzz Website Scraper for IPL Player Data

## Introduction

The cricketbuzz Website Scraper is a Node.js application designed to fetch cricket player data for IPL teams from the cricketbuzz website. It organizes the data into categories such as winning teams, players, and highest performers. The fetched data is then stored in a directory and exported to an Excel file using the `xlsx` library.

## Used Libraries -

 - `Cheerio` - For scraping the website and fetching the data.  
<img src="./img/01.png" width="800"  /> 

 - `Xlsx` - For exporting the data to an Excel file. 
 - `Request` - For making HTTP requests to the website. 

## Installation
       
     - Clone the repository :

     ```bash
     git clone https://github.com/MehraDevesh2022/Espin-Scrapper.git 
   
        ```

        - Install the dependencies :

        ```bash
        npm install
        ```

        - Run the application :

        ```bash
       node app.js
        ```
 
 ## Usage 
  
  
 - Open the main.js file.
 - Replace the value of url variable with the URL of the web page you want to scrape.
 - Replace the selectors inside the cheerio.load function to select the desired data from the web page.
 - Run `node app.js` in the terminal to start the scraping process.
 - The scraped data will be saved in the output folder with the filename cricketbuzz.txt.

