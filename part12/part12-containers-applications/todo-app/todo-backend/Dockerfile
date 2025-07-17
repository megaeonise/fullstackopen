FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci 

ENV NODE_ENV production

USER node
CMD npm start