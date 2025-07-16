FROM node:20 AS test-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci --include=dev

RUN npm run test

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm prune --production

COPY --from=test-stage /usr/src/app /usr/src/app

RUN VITE_BACKEND_URL=http://localhost:3000/ npm run build

FROM nginx:1.25-alpine


COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
