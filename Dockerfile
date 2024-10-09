FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --link . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

CMD ["npm", "run", "start"]