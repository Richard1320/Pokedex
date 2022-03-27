FROM node:16.14.2-alpine as builder

# Create "global" directory for node modules
RUN mkdir -p /usr/src/node_modules
ENV PATH /usr/src/node_modules/.bin:$PATH

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build production files
RUN npm run build



FROM nginx:alpine

#!/bin/sh

COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
