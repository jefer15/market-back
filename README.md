# Market Back

## Description

This is the backend of the "Market" application, developed with **NestJS**. It connects to a PostgreSQL database using **TypeORM** and provides API endpoints with which the frontend application can interact. It also includes PDF generation functionality using **PDFKit**.

---

## Installation and Runtime Instructions

### Prerequisites

- **Node.js**: Make sure you have the latest version of Node.js installed on your computer. You can download it [here](https://nodejs.org/).
- **PostgreSQL**: This project requires a PostgreSQL database for storage.

### Clone the repository

1. Clone the repository to your local machine:

```bash
git clone https://github.com/jefer15/market-back.git
cd market-back
```

2. Install the dependencies:

```bash
npm install
```

### Configuration

Before running the project, make sure you configure your PostgreSQL connection. You may need to modify environment variables or configuration files as needed (e.g., `.env`).

---

## Available scripts

In this project, you can use the following commands:

### Compile the application

```bash
npm run build
```

This command will compile the TypeScript code into JavaScript and store it in the `dist/` folder.

### Start the application

For development mode (with live reload):

```bash
npm run start:dev
```

For production mode:

```bash
npm run start:prod
```

### Run tests

To run unit tests:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Technologies used

- **NestJS**: Framework for creating efficient code for scalable Node.js applications.
- **TypeORM**: ORM for interacting with PostgreSQL and other relational databases.
- **PDFKit**: Library for programmatically generating PDFs.
- **PostgreSQL**: Relational database for storing data.
- **Jest**: Testing framework for running unit and integration tests.
- **Prettier**: Code formatter for consistent coding style.

---