FROM arm32v7/node:4.8-stretch


RUN apt-get update
RUN apt-get -y install bluetooth bluez libbluetooth-dev libudev-dev

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm install

CMD ["npm", "start"]