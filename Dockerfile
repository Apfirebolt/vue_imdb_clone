FROM node:22-slim AS builder

WORKDIR /usr/src/app

# Disable interactive progress bars and background audit lookups to save CPU/network
ENV NPM_CONFIG_PROGRESS=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_FUND=false \
    NODE_OPTIONS="--max-old-space-size=512"

# Explicitly copy package.json and package-lock.json
COPY package*.json ./

# Prefer npm ci with offline fallback for faster, deterministic installs
RUN npm ci --prefer-offline || npm install --no-audit --no-fund

COPY . .

# Build the Vue static assets
RUN npm run build

FROM nginx:stable-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean out default Nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]