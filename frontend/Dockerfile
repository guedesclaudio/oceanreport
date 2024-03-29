FROM node:16.19.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# Production
FROM node:16.19.0-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 5000