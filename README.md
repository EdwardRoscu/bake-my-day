# Bake My Day

Bake My Day is a web application for selling baked sweets. This README provides instructions on how to set up and run the project locally.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Running the Application](#running-the-application)
4. [API Documentation](#api-documentation)

## Prerequisites

Ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/en)

## Setup

1. Clone the repository to your local machine.
2. In the server directory create a .env file. Use .env.example to configure it.
3. Navigate to both `client` and `server` directories and run both `npm install` and `npm run build` to install the required dependencies.

## Running the Application

### Starting the Backend (Strapi)

1. Open a new terminal and navigate to the `server` directory: `$ cd server`
2. Start the Strapi backend by running: `$ npm run develop`
3. The Strapi admin panel should now be accessible at `http://localhost:4000/admin` (or the port specified in the terminal output).

### Starting the Frontend

1. Open a new terminal and navigate to the `client` directory: `$ cd client`
2. Start the frontend by running: `$ npm run start`
3. The application should now be accessible at `http://localhost:3000` (or the port specified in the terminal output).

## API Documentation
To view the API documentation, navigate to `http://localhost:4000/documentation` in your web browser while the server is running.

Additionally, a Postman collection is included in the server directory for testing the API endpoints.