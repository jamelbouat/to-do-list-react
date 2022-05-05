FROM node:16

LABEL description="frontend"

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
CMD ["npm", "run", "start"]
