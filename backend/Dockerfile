FROM node:15.7.0-alpine3.10 as build

# Create app directory
WORKDIR /usr/src/app/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i --only=production \
        && npm install typescript -g

# Bundle app source
COPY . .

EXPOSE 5000
RUN tsc
CMD [ "node", "./dist/app.js" ]