Welcome to the README file for the Online Restaurant Food Backend Application! This guide will walk you through the setup, implementation, and features of our project.

Technologies Used:
-----------------
1)Node.js
2)Express.js
3)MongoDB
4)JWT (JSON Web Tokens)

Project Overview:
--------------
This project aims to create a backend application for an online restaurant food ordering system. Users will be able to register, login, browse restaurants, view menus, place orders, and manage their accounts. The backend is built using Node.js with Express.js for handling HTTP requests, MongoDB for data storage, and JWT for user authentication and authorization.

Features:
1)User Authentication:
-----------------------
1)Register: Users can create an account with their email and password.
2)Login: Registered users can log in securely using their credentials.
3)Authentication: JWT is used for authenticating users and protecting routes.

2)Restaurant Management:
--------------
1)Add Restaurants: Admins can add new restaurants with details like name, location, and cuisine type.
2)Update/Delete Restaurants: Admins can update or delete existing restaurant details.


POST /api/auth/register: Register a new user.
POST /api/auth/login: Login user and generate JWT token.

Restaurant Management:
POST /api/restaurants: Add a new restaurant.
GET /api/restaurants: Get all restaurants.
GET /api/restaurants/:id: Get details of a specific restaurant.
PUT /api/restaurants/:id: Update restaurant details.
DELETE /api/restaurants/:id: Delete a restaurant.
