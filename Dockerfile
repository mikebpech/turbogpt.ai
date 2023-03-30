FROM node:19-alpine
RUN mkdir /app
COPY . ./app
WORKDIR /app
RUN yarn install
EXPOSE 3000
CMD yarn start