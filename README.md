# MERN Authentication Web App

Welcome to the MERN Authentication Web App repository. This repository contains the source code for a full-stack web application with authentication features.

## Getting Started

Follow these steps to get the app up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- Git to clone the repository (if you prefer to clone instead of downloading the ZIP file).

### Installation

 Clone this repository or download and extract the ZIP file.
 
      https://github.com/MuhammadAbdullah9999/Authentication-web-app-in-MERN.git


### Navigate to the client directory and install the client dependencies.
```shell
   cd client
   npm install
```

Navigate to the server directory and install the server dependencies.

```shell
cd server
npm install
```

In the server directory, create a .env file and declare the required variables, such as secret keys and API keys. For example:

```shell
SECRET_KEY=your-secret-key
EMAIL_HOST=your-email-host
GOOGLE_CLIENT_ID=your-google-cleint-id
GOOGLE_CLEINT_SECRET=your-google-client-secret
```
Replace your-secret-key and your-google-secret with your actual keys.

## Running the App
Start the client application from the client directory.

```shell
cd client
npm start
```
This will start the development server for the client application.
In a separate terminal, start the server from the server directory.
```shell
cd server
npm run serve
```
