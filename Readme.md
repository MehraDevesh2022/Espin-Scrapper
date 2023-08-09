# CricketBuzz Website Scraper

A Node.js project that uses the Cheerio library for web scraping and the Path and File System modules for saving scraped data to a file. The project also uses the Request module for fetching the HTML content of a web page.

## Requirements

- Node.js installed on your system.

## Installation

1. Clone the repository or download the zip file.
2. Run `npm install` to install the required dependencies.

## Usage

1. Open the `main.js` file.
2. Replace the value of `url` variable with the URL of the web page you want to scrape.
3. Replace the selectors inside the `cheerio.load` function to select the desired data from the web page.
4. Run `node app.js` in the terminal to start the scraping process.
5. The scraped data will be saved in the `output` folder with the filename `cricketbuzz.txt`.

## Project Structure

- `main.js`: The main file that contains the scraping logic.
- `output/cricketbuzz.txt`: The file where scraped data is stored.

