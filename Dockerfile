# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --production

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
