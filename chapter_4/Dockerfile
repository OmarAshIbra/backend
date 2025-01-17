# Use an offical node.js runtime as the parent image
FROM node:22-alpine 

# Set the working directory in the container to 
WORKDIR /app


# Copy the package.json and the package-lock.json to the container
COPY package*.json . 


# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs in
EXPOSE 5006

# Define the command to run the application
CMD ["node", "./src/server.js"]
  
