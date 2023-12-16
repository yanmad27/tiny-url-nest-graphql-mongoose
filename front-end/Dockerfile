# Build BASE
FROM node:16-alpine as BASE

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"]
