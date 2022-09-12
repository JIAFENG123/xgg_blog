FROM node
WORKDIR /usr/local/vue/blog

COPY . ./

# building the app
RUN yarn
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]