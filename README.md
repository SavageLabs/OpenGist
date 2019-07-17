# OpenGist
OpenGist is a free software pastebin service. Its textview is based on monaco, storage is provided by a mongodb server, this is a mono app, everything is in one program. The Frontend was build using react.

[Public usable instance](https://paste.savagellc.net)



## Setup
How to build

### Prerequisites
* node and npm
* Docker and docker-compose
* Yarn (`npm i -g yarn`)
### Build and Run
* Run `yarn` in the project root
* Do your edits to the app, knowledge in react might be useful
* Run `yarn build` to build the production version of the app
* Run `docker-compose up -d --build`
* Afterwards you should reverse onto the port from `docker-compose.yml`


# License 
This is free software licensed under GPL 2.0