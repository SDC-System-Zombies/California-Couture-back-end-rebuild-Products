FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
ARG DB_USER
ARG DB_PW
ARG DB_DB
ENV DB_USER ${DB_USER}
ENV DB_PW ${DB_PW}
ENV DB_DB ${DB_DB}
RUN npm install
RUN npm run react-prod
EXPOSE 2222
CMD ["npm", "run", "server-prod"]