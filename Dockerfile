FROM node:14
#RUN apk update

# create root application folder
WORKDIR /app
#WORKDIR .

# copy configs to /app folder
COPY ["package.json", "tsconfig.json", "tsconfig.prod.json", "build.js", ".env", "./"]
# copy source code to /app/src folder
COPY src /app/src

ENV NODE_ENV=development

RUN npm install
RUN npm run-script build

#COPY . .

CMD [ "node", "./dist/index.js" ]
