FROM node:13

# RUN apt-get update \
#     && apt-get install -fy \
#         libpq-dev \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /code
WORKDIR /code
# COPY package.json .
# COPY pm2.json .
RUN npm install -g ts-node
RUN npm install -g typescript
# RUN npm install -g pm2
RUN npm install -g nodemon
RUN npm install -g cross-env
RUN npm install knex -g
RUN npm install typeorm -g
RUN npm install -g gulp-cli
# RUN npm install pg-native -g
# Show current folder structure in logs
# RUN ls -al -R
# CMD pm2-runtime start pm2.json 
ENV NPM_CONFIG_LOGLEVEL warn