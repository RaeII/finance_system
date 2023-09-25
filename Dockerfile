FROM node:16.16.0-alpine

WORKDIR /projetos/app
COPY package.json yarn.lock ./

RUN npm install

COPY . .
CMD ["npm","start"]
