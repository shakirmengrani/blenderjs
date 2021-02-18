FROM node

# RUN apt-get update \
#     && apt-get install -fy \
#         libpq-dev \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /code
WORKDIR /code
COPY package.json .
# COPY pm2.json .
RUN npm install -g ts-node
RUN npm install -g typescript
RUN npm install -g nodemon
RUN npm install -g cross-env
RUN npm install -g knex
RUN npm install -g typeorm
RUN npm install -g gulp-cli
RUN npm i
# RUN npm install pg-native -g
# Show current folder structure in logs
# RUN ls -al -R
COPY . /code
ENV NPM_CONFIG_LOGLEVEL warn