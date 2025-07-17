FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install 

# ARG NODE_ENV
# ENV NODE_ENV=${NODE_ENV}

USER node
CMD ["npm", "run", "dev", "--", "--host"]