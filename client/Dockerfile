FROM node:16

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using package-lock.json
RUN npm ci

# Copy rest of the application
COPY . .

EXPOSE 3000

CMD ["npm", "start"]