FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server.json ./package.json

RUN npm install
#RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./build ./build
COPY ./database ./database
COPY ./server.js ./server.js

EXPOSE 3000
CMD [ "npm", "start" ]