FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run react-prod
EXPOSE 2222
CMD ["npm", "run", "server-prod"]