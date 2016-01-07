FROM node:0.12.9
RUN mkdir /code/
WORKDIR /code/

COPY package.json /code/
RUN npm install

COPY gulpfile.js /code/
