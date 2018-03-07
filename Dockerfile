FROM arm32v7/node:9

RUN apt-get update
RUN apt-get install bluetooth bluez libbluetooth-dev libudev-dev

RUN npm install

CMD ["npm", "start"]