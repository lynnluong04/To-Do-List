# To-Do-List

Live Site: https://lynn-todo.onrender.com/


## Features
- Users (signup and login)
- Lists (full CRUD)
- Tasks (full CRUD)

## Database Schema
![image](https://user-images.githubusercontent.com/100899731/220232766-6dbfbe0f-a68c-4018-a874-b9348b3efc04.png)

Setting up the Development Environment
1. Clone this repository
2. Install the following dependencies in the backend folder. Initialize the server's package.json by running npm init -y. 
npm install the following packages as dependencies:
bcryptjs
cookie-parser
cors
csurf
dotenv
express
express-async-handler
express-validator
helmet
jsonwebtoken
morgan
per-env
pg@">=8.4.1"
sequelize@5
sequelize-cli@5

3. Create a **.env** file based on the example with the proper settings for your development environment in the backend
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your app
    - npx sequelize-cli db:migrate in the backend folder
    - npx sequelize-cli db:seed:all

6. Go into your react app directory and install dependencies and run the app. In the frontend folder, npm install the following packages as dependencies:
js-cookie
react-redux
react-router-dom@^5
redux
redux-thunk

Start the app by running npm start in both the backend and frontend folder
