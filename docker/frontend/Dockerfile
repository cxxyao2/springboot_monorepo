FROM public.ecr.aws/docker/library/node:22.8.0 as build-stage

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM public.ecr.aws/nginx/nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html


EXPOSE 80
