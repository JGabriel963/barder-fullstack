FROM node:latest

WORKDIR /usr/server

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD [ "npm", "run", "start" ]