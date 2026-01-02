FROM node:20-alpine
WORKDIR /api_techshop
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/server.js"]