FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY server.js ./
ENV PORT=3001
ENV HOST=0.0.0.0
ENV DATA_FILE=/app/data/recordings.json
EXPOSE 3001
CMD ["node", "server.js"]
