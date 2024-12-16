FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using package-lock.json
RUN npm install

# Copy rest of the application
COPY . .

EXPOSE 3000

CMD ["npm", "start"]