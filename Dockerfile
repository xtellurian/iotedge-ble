FROM hypriot/rpi-node:8

RUN sudo apt-get update
RUN sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev

RUN npm install

CMD ["npm", "start"]