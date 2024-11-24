FROM node:18-alpine
WORKDIR /app
COPY .env/ ./env
COPY public/ ./public
COPY src/ ./src
COPY package.json .
RUN npm install --loglevel verbose
RUN npm install -g serve
RUN npm run build 
RUN npx tailwindcss -i ./src/index.css -o ./build/tailwind.css
CMD ["serve", "-s", "build"]