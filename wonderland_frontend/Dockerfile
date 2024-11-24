FROM node:22-alpine
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/
RUN npm install
CMD ["npm", "start"]