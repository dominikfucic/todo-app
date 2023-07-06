FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3001
RUN npm run test || exit 1
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]