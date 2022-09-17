FROM node

COPY .next /app/.next
COPY public /app/public
COPY package.json /app
COPY .env /app
COPY .env.development /app
COPY .env.production /app
WORKDIR /app
RUN yarn
EXPOSE 3000
# building the app
# RUN yarn
# RUN yarn build

# Running the app
CMD [ "yarn", "start" ]