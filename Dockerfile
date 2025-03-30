FROM nginx:alpine

COPY src /usr/share/nginx/html

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]