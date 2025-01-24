# Auth0 Integration with React and FastAPI

This project demonstrates how to integrate Auth0 authentication with a React frontend and a FastAPI backend. The application allows users to log in using Auth0, and it includes protected routes that require authentication.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a full-stack application that demonstrates how to integrate Auth0 for authentication. Users can log in using their Google or GitHub accounts, and access protected routes that require authentication. The project is built using React for the frontend and FastAPI for the backend.

## Features

- User authentication with Auth0
- Login with Google and GitHub
- Protected routes that require authentication
- Token storage in session storage
- Logout functionality

## Technologies Used

- React
- FastAPI
- Auth0
- Axios
- Material-UI
- Python
- JavaScript

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Auth0 account

### Clone the Repository

```sh
git clone https://github.com/Theideabased/Auth0_React_and_FastAPI_FULL_VERSION.git
cd your-repo 
```


## Install Frontend Dependencies
```sh
cd client
npm install
```

## Install Backend Dependencies
```sh
cd backend
pip install -r requirements.txt
```

## Environment Variables
Create a .env file in the root directory of the frontend and backend with the following environment variables:

## Frontend
```sh
REACT_APP_BACKEND_URL=<'fastapi url'>
REACT_APP_AUTH0_DOMAIN=<'auth0 domain'>
REACT_APP_AUTH0_API_DEFAULT_AUDIENCE=<'auth0 audience'>
REACT_APP_AUTH0_CLIENT_ID=<'client id in auth0'>
REACT_APP_AUTH0_REDIRECT_URI=<'Your call back url'>
REACT_APP_AUTH0_LOGOUT_REDIRECT_URI=<'Your logout url'>
```

## Backend
back.env
```sh
AUTH0_CLIENT_ID=<'application client id'>
AUTH0_CLIENT_SECRET=<'application client secret'>
AUTH0_DOMAIN=<'auth0 domain'>
AUTH0_API_AUDIENCE=<'auth0 audience'>
AUTH0_REDIRECT_URI=<'redirect url'>
AUTH0_LOGOUT_REDIRECT_URI=<'Your logout url'>
APP_SECRET_KEY=<optional> 'you can use `openssl rand -hex 32` on the shell to get one
```

# Running the Application

## Start the Backend Server
```sh
uvicorn app.main:app --reload
```

## Start the Frontend Server
```sh
npm start
```

## Project Structure
```
.
├── backend
│   ├── app
│   │   ├── auth_routes.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── main.py
│   ├── requirements.txt
│   └── back.env
├── client
│   ├── public
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── components
│   │   │   ├── landing_page
│   │   │   │   └── LandingPage.js
│   │   │   ├── login
│   │   │   │   ├── Login.js
│   │   │   │   └── Login.css
│   │   ├── pages
│   │   │   ├── Callback.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ErrorPage.js
│   │   │   ├── Home.js
│   │   │   ├── LoginButton.js
│   │   │   └── LogoutButton.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── App.test.js
│   │   ├── index.js
│   │   ├── index.css
│   ├── .env
│   ├── package.json
│   └── README.md
```
## Usage
Open http://localhost:3000 in your browser.
Click on the "Login" button to log in using Auth0.
After logging in, you will be redirected to the dashboard.
The dashboard will display a message indicating that you are logged in and authenticated.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

### Note:
This project was created in 2025 and uses the latest versions of the dependencies as of that year.