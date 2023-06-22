# Airbngig

Digital Career Institute final project (8 weeks)

## Table of contents :

- [Introduction](#introduction)
- [Installation](#installation)
  - [Obtain API Keys](#obtain-api-keys)
  - [Setting Up Cloudinary](#setting-up-cloudinary)
  - [Database Setup](#database-setup)
- [Main Features](#main-features)
- [Contributors](#contributors)

## Introduction<a name="introduction"></a>

**An Airbnb for non-professional musicians**

This application is dedicated to non-professional musicians who want to expand their music beyond their hometown, play in new places, even far from home, without having to worry about finding a place to sleep or carrying pounds of gear.

This platform uses geolocation.

**How it works ?**

when a user provide a specific adress to the website, a bar or a venue for example, he can see all the other users accounts in the area of this location.

From there, he can click on a specific user and visit his profile.

When he is on his profile, if he wants, he can then directly contact this user via a chat application.

## Installation<a name="installation"></a>

git clone <git@github.com:Ludovil/dci_final_project.git>

cd server/client

npm install

### Obtain API keys :<a name="obtain-api-keys"></a>

- Sign up for an account at https://www.geoapify.com/
- Navigate to the API settings or developer dashboard to generate an API key.
- Copy the API key to use it in the next step.
- Create a .env file in the server directory of the project.
- Inside the .env file, add the following line:

API_KEY=your-api-key

### Setting up Cloudinary :<a name="setting-up-cloudinary"></a>

- Sign up for an account at https://cloudinary.com/
- follow the same steps as above
- Inside the .env file, add the following line:

CLOUD_NAME=your-cloud-name

CLOUD_API_KEY=your-cloud-api-key

CLOUD_API_SECRET=your-cloud-api-secret

In the home directory of cloudinary create the following folders :

    final_project/instruments

This app uses bcrypt for hashing the passwords.
You also need to add this line in the .env file :

SIGNATURE=what-ever-you-want-to-add-here

### DATABASE SETUP :<a name="database-setup"></a>

- Sign up for an account at https://www.mongodb.com/atlas/database
- create a database named airbngig
- add the following lines in your .env file :

MONGO_NAME=your-mongo-user-name

MONGO_PW=your-mongo-password

MONGO_DB=your-mongo-cluster

**Main features :**<a name="main-features"></a>

A user is registred as a band or a single musician.
Besides username, password and usefull data he has to provide :

- his location
- how many places to sleep he provides
- what kind of gear he provides
- (optional) music genre

The user account also show the rating given by other users, after they made the first exchange, and also some reviews and comments.

## Contributors :<a name="contributors"></a>

Ludovic Saule

Ricardo Carino

Darko Illieski

### Contact :

ludovic_saule@hotmail.fr
