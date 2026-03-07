ARG NODE_VERSION=22.15.0

FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
