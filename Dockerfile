# grab Node.js Carbon image
FROM node:alpine
# expose Node.js server's port
EXPOSE 3000
# switch to custom directory
WORKDIR /datix
# copy source code onto container
COPY . .
# switch to server directory
WORKDIR /datix/server
# install dependencies
RUN npm install
# run application
CMD ["npm", "start"]