# FROM cypress/base:20.11.0 AS test-stage 

# WORKDIR /usr/src/app

# COPY . .

# RUN npm ci --include=dev

# RUN npm run test
# RUN npm run test:e2e

# FROM node:20 AS build-stage 

# WORKDIR /usr/src/app

# COPY . .

# COPY --from=test-stage /usr/src/app /usr/src/app
# RUN npm prune --production

# ENV NODE_ENV production


# FROM nginx:1.25-alpine


# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
FROM node:20 AS test-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci --include=dev

RUN npm run test

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .


COPY --from=test-stage /usr/src/app /usr/src/app
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production


FROM nginx:1.25-alpine


COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
