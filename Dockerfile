FROM node:6-alpine

ENV \
  NODE_ENV=production \
  PORT=3015

VOLUME /root/.cache

WORKDIR /opt/app

COPY . /opt/app

RUN \
  NODE_ENV=development yarn && \
  yarn build && \
  yarn

EXPOSE $PORT

CMD [ "yarn", "start" ]

