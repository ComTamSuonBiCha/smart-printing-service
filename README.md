# Smart Student Printing Service
Welcome to our group project for Software Engineering (CO3001) course, semester 241.
## Introduction
The HCMUT Smart Printing Service (HCMUT-SSPS) is an automated printing solution designed to serve the students of HCMUT across multiple campuses. The primary goal of the system is to provide a convenient and efficient way for students to print their academic documents. The service involves a network of printers located strategically around campus buildings, which are accessible via a web-based and mobile application.
## Technology Stack
- Front-end: HTML, CSS, Javascript, ReactJS
- Back-end: NodeJS, ExpressJS
- Database: MySQL
- Other tool: Figma, Docker, PostmanAPI
## Contributor
This project is implemented by Group 04 Class CC03 from Ho Chi Minh city University of Technology - VNU HCM. Our group members:
- Lý Tuấn Lộc - 2252456
- Lê Thị Phương Thảo - 2252757
- Lý Triều Uy - 2252889
- Nguyễn Anh Khoa - 2252351
- Lưu Quang Hoàng Cương - 2152032
## How to run this project
### Prerequisites
Ensure you have the following installed on your system:

- **For Docker setup:**
  - Docker
  - Docker Compose

- **For manual setup:**
  - Node.js (v16 or later recommended)
  - MySQL
  - npm (Node Package Manager)

---

### Running with Docker

If you have Docker installed, follow these steps to quickly set up and run the project:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Start the Docker containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: Navigate to `http://localhost:3000` in your browser.
   - Backend API: Visit `http://localhost:5000` for the API endpoints.

4. (Optional) To stop the containers:
   ```bash
   docker-compose down
   ```

---

### Running Without Docker

If you don’t have Docker installed, you can manually set up the environment as follows:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up the database:
   - Install MySQL and create a database for the project.
   - Use the spss.sql to run in MySQL
   - Update the `.env` file with your MySQL credentials (host, user, password, database name).

3. Install dependencies:
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

4. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

6. Access the application:
   - Frontend: Navigate to `http://localhost:3000` in your browser.
   - Backend API: Visit `http://localhost:5000` for the API endpoints.

---

### Notes
- Ensure the database server is running and the tables are properly migrated before starting the backend server.
- Use `Postman` or any API testing tool to test backend endpoints.
- Ensure any required environment variables are configured in a `.env` file for both the backend and frontend.
