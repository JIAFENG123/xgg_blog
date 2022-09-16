FROM node

COPY .next /app/.next
COPY public /app/public
COPY package.json /app
WORKDIR /app
# building the app
# RUN yarn
# RUN yarn build

# Running the app
CMD [ "yarn", "start" ]