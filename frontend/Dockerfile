FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Fix file permissions
RUN chmod -R 755 /app/node_modules/.bin

EXPOSE 5173

CMD ["npm", "run", "dev"]

