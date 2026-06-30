FROM ghcr.io/pnpm/pnpm:11

RUN pnpm runtime set node 24 -g

WORKDIR /app

COPY ./package.json .

RUN pnpm install --forzen-lockfile

COPY . .

RUN pnpm run build

CMD ["node", "./dist/app.js"]
