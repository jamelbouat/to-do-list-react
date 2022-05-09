FROM node:16-slim

LABEL description="frontend"

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

#RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

# COPY command.sh /scripts/command.sh
# RUN ["chmod", "+x", "/scripts/command.sh"]

# ENTRYPOINT ["sh", "/scripts/command.sh"]

CMD ["sh", "./command.sh" ]
