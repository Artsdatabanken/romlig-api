FROM node:10 as dep

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile --no-cache --production

FROM node:10
RUN groupadd -r --gid 1007 dockerrunner && useradd -r -g dockerrunner dockerrunner
WORKDIR /app
COPY --from=dep /node_modules ./node_modules
EXPOSE 9876
ADD . .
USER dockerrunner
CMD [ "node", "src/index.js", "--port", "9876", "--dataPath", "/data/" ]