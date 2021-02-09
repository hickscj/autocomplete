# Autocomplete
An autocomplete application with API and frontend

## Build the docker container
`docker-compose up --build`
This will populate the mongodb database with a list of words for the application.

## Run the docker container
`docker-compose up -d`
This will run the container in a detached state so the terminal window doesn't have to stay in use.
For development purposes, `nodemon` is used in the Dockerfile to refresh the server on changes to the API server. That can optionally be changed to simply run `node`.

To test the API, run `curl --location --request GET 'http://localhost:3000/api/v1/search?q=ab'`, or start the web app.

## Running the frontend application
The frontend is built with React and uses Parcel to build. Change directories into `ui` and run `npm run dev`.

Type any word in the input box and suggestions should pop up. Use `Tab` to navigate to one and `Enter` to select. `Esc` can be used to cancel the search.
