FROM node

COPY .next /app/.next
COPY public /app/public
COPY package.json /app
WORKDIR /app
RUN yarn
EXPOSE 3000
# building the app
# RUN yarn
# RUN yarn build

# Running the app
CMD [ "yarn", "start" ]