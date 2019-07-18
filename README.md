# OpenGist
OpenGist is a free software pastebin service. Its textview is based on monaco, storage is provided by a mongodb server, this is a mono app, everything is in one program. The Frontend was build using react.

[Public usable instance](https://paste.savagellc.net)

# Setup
This guide will show you how to install OpenGist on your local/remote computer/server.

### Prerequisites
You will need to install the following packages:
* Docker 1.13.0+, see the [official documentation](https://docs.docker.com/install/).
* docker-compose

### Setup and Run
* Clone the repository on the target host (the one that will run as the site)
* Navigate to the root folder from the command line
* Run the site using the command `docker-compose up -d --build`

## Contributing
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