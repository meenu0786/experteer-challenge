# pull official base image
FROM node:14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN \
    rm -rf package-lock.json; \
    rm -rf yarn.lock: \
    rm -rf node_modules/

RUN yarn install

ENV REACT_APP_API_URL=http://localhost:8080

EXPOSE 3000

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
