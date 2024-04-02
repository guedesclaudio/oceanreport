FROM node:16.19.0 AS builder

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules
RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

RUN mv build/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react

CMD ["npx", "serve", "-s", "build"]

EXPOSE 5000