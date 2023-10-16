# MERN Authentication Web App

Title: Authentication App - MERN Stack with JWT and Google OAuth

## Description:
Welcome to the GitHub repository of our powerful Authentication App, developed using the MERN (MongoDB, Express.js, React, and Node.js) stack. This application is designed to provide users with a secure and seamless experience for sign-up and login, featuring token-based authentication, user data storage in MongoDB, and the ability to sign up or log in using Google OAuth via Passport.js. Here are the key features of this application:

## Features:
1. Sign-Up and Login:
   - Users can sign up for a new account by providing their email and password.
   - Secure and easy-to-use login functionality for existing users.

2. User Dashboard:
   - Upon successful login, users are directed to their personalized dashboard.

3. JSON Web Token (JWT) Authentication:
   - User data is securely stored in browser cookies using JWT.
   - Returning users are automatically logged in.

4. User Data Storage:
   - User registration details are stored securely in a MongoDB database.
   - User password is encrypted using Bcrypt for enhanced security.

5. Google OAuth with Passport.js:
   - Users have the option to sign up or log in using their Google account.
   - Passport.js integration ensures a smooth and secure OAuth process.


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

In the server directory, create a .env file and declare the required variables. For example:

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
