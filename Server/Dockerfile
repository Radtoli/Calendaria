FROM node:20

WORKDIR /app/

COPY . /app/

RUN apt-get update

RUN apt-get upgrade -y

RUN npm install

RUN npm run build

RUN rm -rf tmp/*

EXPOSE 80

CMD ["node", "./dist/index.js"]