# Product Transaction Dashboard

## Overview

The Product Transaction Dashboard is a web application designed to track and visualize product transactions. It uses the MERN stack (MongoDB, Express.js, React, Node.js) for a full-stack solution, providing a frontend interface and a backend API to manage and display transaction data.

## Project Structure

- **Client:** Contains the frontend code for the application.
- **Server:** Contains the backend code, including API endpoints and database interactions.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sukhman-123/product-transaction.git
   cd product-transaction
   
2. **Set up the backend:**
- Navigate to the server directory: cd server

- Install the required dependencies: npm install

- Configure environment variables (create a .env file with MONGO_URI and PORT as variables)

- Start the server: npm start
  

3. **Set up the frontend:**

- Navigate to the client directory: cd ../client

- Install the required dependencies: npm install

- Start the development server: npm start
  

**API Endpoints:**

/combined-data

Method: GET

Description: Fetches combined data for statistics and charts.

Query Parameters:

month (optional): The month for which to fetch data. Defaults to 3.


/transactions

Method: GET

Description: Retrieves transaction data.

Query Parameters:

month (optional): The month for which to fetch transactions.

page (optional): The page number for pagination.

limit (optional): The number of transactions per page.

search (optional): A search term to filter transactions.



**Usage:**

Navigate to the frontend application to view and interact with the transaction dashboard.

Use the provided API endpoints to fetch and manipulate transaction data.



**Contributing:**
Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Create a new Pull Request.


**Acknowledgments:**

The MERN stack for providing a robust framework for building full-stack applications.

Ant Design for the UI components used in the frontend.

