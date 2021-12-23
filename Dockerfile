FROM node:16

WORKDIR /app

RUN useradd -ms /bin/bash node

RUN chown node /app/data

COPY ./package* ./

RUN npm install

COPY . ./

RUN npm run build

USER node

CMD ["npm", "start"]
