# Udacity ND FED - Project 4

[![NodeJS with Webpack](https://github.com/bausv/nd0011-04-evaluate-news-nlp-new/actions/workflows/webpack.yml/badge.svg?branch=master "NodeJS with Webpack")](https://github.com/bausv/nd0011-04-evaluate-news-nlp-new/actions/workflows/webpack.yml)

## About
This project is part of the [Udacity](https://udacity.com/) Nanodegree program [Front End Web Developer](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). It is about integrating an external API - in this case for text sentiment analysis. Technically it's based on Node.js and Express.

## Major External Libraries and Frameworks Used, Credits

* This project uses the [Meaning Cloud Sentiment Analysis API](https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/what-is-sentiment-analysis), version 2.1 for sentiment analysis. Text examples used in this project are taken from their [Examples](https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/examples)-page
* This project uses [Font Awesome Free](https://fontawesome.com/), version 6.2.1 for illustrating the NLP analysis result with icons
* [favicon.ico](src/server/img/favicon.ico) taken from GitHub at [udacity/responsive-images](https://github.com/udacity/responsive-images)
* Color palette used has been generated using [mycolor.space](https://mycolor.space/?hex=%23ADD8E6&sub=1)

## Prerequisites, Installation, Execution
* [Node.js](https://nodejs.org/) 18 installed
* a valid API key for the [Meaning Cloud Sentiment Analysis API](https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/what-is-sentiment-analysis)
* create a `.env` file in the root folder with the following content:
```
API_KEY=<your MeaningCloud API key>
```
* run `npm install`
* execute 
  * `npm run start` for using the [production configuration](./webpack.prod.js) including service worker, or
  * `npm run start-dev` for using the [development configuration](./webpack.dev.js)
