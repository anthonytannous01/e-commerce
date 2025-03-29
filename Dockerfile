FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM node:18-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist/e-commerce /app

EXPOSE 8080

CMD ["http-server", "/app", "-p", "8080"]
