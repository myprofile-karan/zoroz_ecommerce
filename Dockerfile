# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your project (for TypeScript or SCSS, depending on your setup)
RUN npm install --legacy-peer-deps  # You might have different commands for TypeScript or SCSS

# Expose the port on which your app will run (usually 3000 for Node.js apps)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
