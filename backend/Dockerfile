FROM node:20-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./
COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

USER node

CMD ["node", "server.js"]
