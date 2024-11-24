FROM node:22-alpine
WORKDIR /app
COPY public/ ./public
COPY src/ ./src
COPY node_modules/ ./node_modules
COPY package.json .
# RUN npm install
CMD ["npm", "start"]