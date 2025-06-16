# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./

COPY . /app
COPY ./public /app/public
COPY ./src /app/src

RUN npm ci

RUN npm run build

# Stage 2: Runtime (servidor estático com nginx)
FROM nginx:alpine

# Copia build estático para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow access to the static site served by nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]