
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 4000

CMD ["npm", "start"]
