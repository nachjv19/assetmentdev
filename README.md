📦 Assetmest – Transaction Management API

Assetmest is a REST API developed with Node.js, Express, and PostgreSQL for managing transactions, invoices, and other related data.

It includes support for data loading via CSV files, custom queries, and a modular architecture that separates controllers, routes, and database connections.

📚 Table of Contents

Technologies

Project Structure

Installation and Configuration

Available Scripts

Database

Endpoints

Examples of Use

Future Enhancements

License

🛠 Technologies

Node.js – JavaScript runtime.

Express – Framework for creating the API.

PostgreSQL – Relational database.

pg – Official PostgreSQL client in Node.js.

nodemon – Automatic reloading during development.

cors – Support for requests from other domains.

csv-parser – Reading and loading data from CSV files.

📂 Project Structure

assetmest/
│ package.json # Dependencies and scripts
│ README.md # Project documentation
└─ src/
├─ index.js # Server entry point
├─ db.js # Connection to the PostgreSQL database
├─ .env # Environment variables
├─ controllers/ # Business logic
├─ routes/ # API routes
├─ data/ # CSV files
└─ db/
└─ schema.sql # SQL script to create tables

⚙ Installation and Configuration

1️⃣ Clone the repository

git clone https://github.com/tu-usuario/assetmest.git
cd assetmest

2️⃣ Install dependencies

npm install

3️⃣ Configure environment variables
Create a .env file in src/ with:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=assetmest
DB_PASSWORD=tu_password
DB_PORT=5432

4️⃣ Create the database and tables

psql -U postgres -d assetmest -f src/db/schema.sql


📜 Available Scripts

npm run dev Starts the server with nodemon for development.
npm start Starts the server in production mode.

🗄 Database

Example of schema.sql:

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    transaction_code VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    invoice_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
invoice_id SERIAL PRIMARY KEY,
invoice_code VARCHAR(50) NOT NULL,
description TEXT,
issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
customer_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
id BIGINT UNIQUE NOT NULL,
address TEXT,
phone VARCHAR(30),
email VARCHAR(150) UNIQUE
);

CREATE TABLE platforms (
    platform_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

📡 Endpoints
Transactions

| Method | Endpoint | Description |
| ------ | ------------------------ | ------------------------------------- |
| GET | `/api/transactions` | List all transactions. |
| GET | `/api/transactions/:id` | Get a transaction by ID. |
| POST | `/api/transactions` | Create a new transaction. |
| PUT | `/api/transactions/:id` | Update an existing transaction. |
| DELETE | `/api/transactions/:id` | Delete a transaction by ID. |

Invoices

| Method | Endpoint | Description |
| ------ | ------------------- | --------------------------- |
| GET | `/api/invoices` | List all invoices. |
| GET | `/api/invoices/:id` | Get an invoice by ID. |
| POST | `/api/invoices` | Create a new invoice. |
| PUT | `/api/invoices/:id` | Update an invoice. |
| DELETE | `/api/invoices/:id` | Delete an invoice. |

🧪 Usage Examples
Create a transaction

curl -X POST http://localhost:3000/api/transactions \
-H "Content-Type: application/json" \
-d '{
  "transaction_code": "TXN001",
  "amount": 500.00,
  "invoice_id": 1
}'

{
"message": "Transaction created successfully"
}

Get all transactions

curl http://localhost:3000/api/transacciones

[
{
"transaction_id": 1,
"transaction_code": "TXN001",
"amount": 500.00,
"invoice_id": 1,
"date": "2025-08-13T10:00:00.000Z"
}
]

🚀 Future Improvements

JWT authentication.

Paging and list filters.

CSV upload from the frontend.

PDF/Excel reports.

📄 License

This project is licensed under the MIT License. You may use and modify it freely.
