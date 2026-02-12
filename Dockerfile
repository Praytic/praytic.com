# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY .nvmrc package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@9.14.4
RUN pnpm install --frozen-lockfile
COPY homepage/ ./homepage/
WORKDIR /app/homepage
RUN pnpm build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/homepage/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
