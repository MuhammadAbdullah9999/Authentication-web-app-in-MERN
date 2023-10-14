# MERN Authentication Web App

Welcome to the MERN Authentication Web App repository. This repository contains the source code for a full-stack web application with authentication features.

## Getting Started

Follow these steps to get the app up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- Git to clone the repository (if you prefer to clone instead of downloading the ZIP file).

### Installation

1. Clone this repository or download and extract the ZIP file.

   ```shell
   git clone https://github.com/your-username/your-repo-name.git

   
### Navigate to the client directory and install the client dependencies.

cd client
npm install

Navigate to the server directory and install the server dependencies.

cd server
npm install

In the server directory, create a .env file and declare the required variables, such as secret keys and API keys. For example:

SECRET_KEY=your-secret-key
GOOGLE_SECRET=your-google-secret

Replace your-secret-key and your-google-secret with your actual keys.

## Running the App
Start the client application from the client directory.

cd client
npm start

This will start the development server for the client application.
In a separate terminal, start the server from the server directory.

cd server
npm run serve
