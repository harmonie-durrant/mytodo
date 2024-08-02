ARG NODE_VERSION=20.10.0

# Use the official Node.js image.
FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY . .

# Install dependencies.
RUN npm install
# Delete .next folder if exists
RUN rm -rf .next
# Run the build script.
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD npm run start
