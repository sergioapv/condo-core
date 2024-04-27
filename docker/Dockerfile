FROM node:14-alpine

RUN apk update && apk add bash

WORKDIR /home/node/app
COPY ./frontend ./frontend

USER root

WORKDIR "/home/node/app/frontend"
RUN ls
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

