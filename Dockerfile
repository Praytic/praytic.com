# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY .nvmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY homepage/ ./homepage/
RUN npm install -g pnpm@9.14.4
RUN pnpm install --frozen-lockfile
RUN pnpm --filter homepage build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/homepage/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
