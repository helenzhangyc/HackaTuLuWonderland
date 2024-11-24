FROM node:18-alpine
WORKDIR /app
COPY public/ ./public
COPY src/ ./src
COPY package.json .
RUN npm install --loglevel verbose
RUN npm install -g serve
RUN npm run build 
CMD ["serve", "-s", "build"]