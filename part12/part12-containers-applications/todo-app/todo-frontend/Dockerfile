FROM node:20 AS test-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci --include=dev

RUN npm run test

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .


COPY --from=test-stage /usr/src/app /usr/src/app
ARG VITE_BACKEND_URL
ENV NODE_ENV production
RUN VITE_BACKEND_URL=${VITE_BACKEND_URL} npm run build
RUN npm prune --production


FROM nginx:1.25-alpine


COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
