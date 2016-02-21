FROM node:0.12.9

RUN mkdir /code/

WORKDIR /code/

ENV PORT 80

CMD ["node", "node_modules/.bin/gulp"]
