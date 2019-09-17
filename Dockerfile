FROM node:10
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 80
EXPOSE 8080

CMD ["node", "app.js"]

