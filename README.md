# Backend Assignment

## Pre-requisite
Make sure Node is installed in your machine

# Steps to run the app
1. Clone the repository using this command
  ```bash
   git clone https://github.com/kunalbarve02/socialmedia.git
  ```
2. Run the following command to install dependencies 
  ```bash
   npm i
  ```
3. If all dependencies are installed successfully run this command to start the app
  ```bash
   npm start
  ```
4. If you see this output in console 
  ```bash
   app is running at 8000
   DB CONNECTED
  ```
  then app is up and running.
  
5. Refer Postman colection and documentation to execute APIs

Postman Collection - https://www.postman.com/avionics-geologist-11393109/workspace/public/collection/27284879-e352199f-0ae5-4eb3-94d0-ce6525429c81?action=share&creator=27284879
Postman Documentation - https://documenter.getpostman.com/view/27284879/2s93sc4Xon

# Steps for using Postman Collection
1. Create an user with Signup request
2. Then signin to obtain JWT Token and user-id
3. Everytime a user signs in click on social media collection go to variables and replace token and userid value with current token and 
   user-id value

# Additional Libraries

1. body-parser 
2. cookie-parser  
3. cors
4. dotenv
5. express
6. express-jwt
7. express-validator
8. jsonwebtoken
9. mongoose
10. nodemon
11. npm
12. uuid
