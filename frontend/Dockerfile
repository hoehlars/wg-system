
#build environemnt
FROM node:15.7.0-alpine3.10 as build
WORKDIR /usr/src/app/backend
COPY . .
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/backend/build /usr/share/nginx/html
COPY --from=build /usr/src/app/backend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]