FROM nginx:stable-alpine as production-build

COPY nginx.conf /etc/nginx/nginx.conf

COPY docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

