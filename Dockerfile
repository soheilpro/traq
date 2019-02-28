FROM node:8.4-alpine

WORKDIR /usr/app
COPY . /usr/app/

ENTRYPOINT ["./entrypoint.sh"]
