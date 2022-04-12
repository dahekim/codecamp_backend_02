FROM node:14

WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install --netwrok-timeout 600000


COPY . /myfolder/

CMD yarn start:dev