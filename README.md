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

# License 
This is free software licensed under GPL 2.0