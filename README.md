# Bake My Day

Bake My Day is a web application for selling baked sweets. This README provides instructions on how to set up and run the project locally.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Running the Application](#running-the-application)

## Prerequisites

Ensure you have the following software installed on your system:

- Node.js (version 16.19.1 or higher)
- npm (version 8.19.3 or higher)
- Strapi (version 3.6.11 or higher)

## Setup

1. Clone the repository to your local machine.
2. Navigate to both `client` and `server` directories and run `npm install` to install the required dependencies.

## Running the Application

### Starting the Frontend

1. Open a new terminal and navigate to the `client` directory: `$ cd client`
2. Start the frontend by running: `$ npm run start`
3. The application should now be accessible at `http://localhost:3000` (or the port specified in the terminal output).

### Starting the Backend (Strapi)

1. Open a new terminal and navigate to the `server` directory: `$ cd server`
2. Start the Strapi backend by running: `$ npm run develop`
3. The Strapi admin panel should now be accessible at `http://localhost:1337/admin` (or the port specified in the terminal output).

You may need to kill all tasks currently running on port 1337.
To do so, for windows, run cmd as admin and do:
```
$ netstat -ano | findstr :1337
$ taskkill /F /PID <PID_number>
```