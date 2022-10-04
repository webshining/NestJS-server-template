# build app
FROM node:16-slim As development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# run builded app
FROM node:16-slim As production

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/dist ./dist
COPY --from=development /app/package*.json .
COPY --from=development /app/*.env .

RUN npm install

CMD ["node", "dist/main"]