FROM node:16

LABEL description="frontend"

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
CMD ["npm", "run", "start"]
