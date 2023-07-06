FROM node:20-alpine3.17 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_TEST_MODE=true
RUN npm run test || exit 1
ENV VITE_TEST_MODE=false
RUN npm run build

FROM nginx:1.25-alpine3.17
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]