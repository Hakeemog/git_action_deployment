FROM node:12-stretch


ENV APP_PATH=/usr/src/app NPM_CONFIG_LOGLEVEL=warn


WORKDIR $APP_PATH
COPY . $APP_PATH

RUN apt-get update && apt-get install dos2unix
RUN npm set progress=false && npm i && npm i -g nodemon && npm install forever -g  && npm cache verify
RUN bash -c "chmod +x ./docker/bash.sh"
RUN cd client && npm set progress=false && npm i && npm run build && npm cache verify 
RUN bash -c "chmod +x ./docker/run.sh"
RUN dos2unix ./docker/run.sh

EXPOSE 80 8081 3000


CMD ["./docker/run.sh"]
