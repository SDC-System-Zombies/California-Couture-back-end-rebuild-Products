FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 2222
CMD ["npm", "run", "react-prod"]