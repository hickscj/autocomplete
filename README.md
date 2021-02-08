# schoology-autocomplete
An autocomplete application with API and frontend

## Build the docker container
`docker build -t autocomplete-api .`

## Run the docker container
`docker run --init --rm --publish 3000:3000 --detach autocomplete-api`
