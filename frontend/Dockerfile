# Node base image
FROM node:20-alpine

# Set work directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY frontend/ ./

# Expose port
EXPOSE 3000

# Start React
CMD ["npm", "start"]