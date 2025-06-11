# Use a Node image with npm
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy the rest of the code
COPY . .

# Install TypeScript globally (optional if already in your deps)
RUN npm install -g ts-node typescript

# Install dependencies, including ts-node-dev
RUN npm install

# Expose your app port
EXPOSE 3000

# Run the TypeScript code directly with ts-node-dev
CMD ["ts-node", "src/index.ts"]