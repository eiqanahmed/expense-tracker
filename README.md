READ.ME

## Overview: 
This expense tracker is a full-stack web application designed to help users manage their expenses efficiently. 
Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a seamless and interactive 
experience for tracking personal finances. Note: The repository is configured to production mode as this web app has been deployed on vercel. To use this app on 
your own machine follow the steps outlined in 'Installation' below.

## Features:
- Expense Management: Add, edit, and delete expenses.
- Expense Categories: Organize expenses by categories.
- Dashboard: Visualize expenses with charts and summaries.
- History: View entire transaction history.

## Technologies Used:
- Frontend: Javascript, React.js, Axios, Chakra-UI
- Backend: Javascript, Node.js, Express.js, MongoDB

## Installation and Usage:
### Prerequisites:
- Node.js
- MongoDB

### Installation:
1. Download MongoDB compass, create a mongodb database called expenses, with a collection called transactions. 
2. Clone the repository using: git clone https://github.com/eiqanahmed/expense-tracker.git
3. type the following command: cd expense-tracker
4. Install the dependencies for both the frontend and backend by using the following commands in order:
   1. cd backend
   2. npm install
   3. cd ../frontend
   4. npm install
5. Go to frontend/.env, and change the REACT_APP_BACKEND_URL environment variable to 'http://localhost:3001', as that is the port that the backend is running on.
6. Go to backend/ .env and replace the MONGODB_URI with your MongoDB database's connection string.

### Usage:
Type the following commands in order (make sure you are in the root directory, expense-tracker):
1. cd backend
2. npm start
3. cd ../frontend
4. npm start
