FROM node:10
USER node
WORKDIR /home/node
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
