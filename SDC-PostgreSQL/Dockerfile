FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV DB_USER ${DB_USER}
ENV DB_PW ${DB_PW}
ENV DB_DB ${DB_DB}
ENV REACT_APP_API_TOKEN ${REACT_APP_API_TOKEN}
ENV RELIC_KEY ${RELIC_KEY}
RUN npm install
RUN npm run react-prod
EXPOSE 2222
CMD ["npm", "run", "server-prod"]