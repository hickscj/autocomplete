# schoology-autocomplete
An autocomplete application with API and frontend

## Build the docker container
`docker build -t autocomplete-api .`

## Run the docker container
`docker run --init --rm --publish 3000:3000 --detach autocomplete-api`




## Create the network bridge
docker network create --driver=bridge app-net

## Run the mongo container
docker run -d --network=app-net -p 27017:27017 --name=db --rm mongo:3
  

## Run the mongo client
docker run -it --network=app-net --rm mongo:3 mongo --host db



docker run -p 3000:3000 --network=app-net --env MONGO_CONNECTION_STRING=mongodb://db:27017 app-with-mongo
  