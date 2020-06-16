# Evaluate-News-NLP Project

## Starter Code
For the project, the starter code provided by Udacity provides the minimum of webpack and local server. The starter can be found at [Udacity Starter Code](https://github.com/udacity/fend/tree/refresh-2019/projects/evaluate-news-nlp)

## Project Requirement
Main project requirements are:
1. Set up API configuration with Aylien for sentiment analysis
2. Establish a client side that POST a link to an article or tweet to the API for sentiment analysis
3. Update the UI dynamically to reflect the sentiment analysis result
4. Configure webpack to seperate development and production code
5. Using webpack to minify production code
6. Write simple test using jest

The full project rubric can be found in the Requirement PDF.

## Running the Project
1. Clone the repository
2. `npm install`

For production code:
1. `npm run build-prod`
2. `npm run start`
3. Go to `localhost://8081`

For development code:
1. `npm run build-dev`
2. `npm run start`
3. Go to `localhost://8081` if it hasn't take you there
