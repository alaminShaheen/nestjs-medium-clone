###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine3.15 AS development

# Create a working directory inside our container
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# We are copying both package.json AND package-lock.json to our working directory
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy and bundle app's source code to container working directory
COPY ./ ./

# Expose our app to port 3000
#EXPOSE 3000

# Compile out typescript files to javascript files in dist folder
# RUN npm run build

# Define the command to run app using CMD which defines our runtime
#CMD [ "node", "dist/main.js" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine3.15 As build

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV production

###################
# PRODUCTION
###################

FROM node:16-alpine3.15 As production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
