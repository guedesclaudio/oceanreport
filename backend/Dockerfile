FROM node:16.19.0 as builder

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install -g prisma

RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

RUN npm run build

# Production
FROM node:16.19.0

WORKDIR /app

COPY --from=builder /app .

RUN apt-get update && apt-get install -y wget

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

CMD ["npm", "run", "start"]
