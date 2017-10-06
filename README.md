# unit02-project

Is it time for coffee for two? We hope you said yes.

Welcome to Coffee 4&#183;2.

![Coffee 4&#183;2 landing page](https://github.com/cathua/project2/blob/master/Coffee42_LandingPage.png "Landing Page")

## Overview

This application is a fullstack CRUD web application that randomly pairs users in its user database with others to facilitate meet-ups. By utilizing modules such as Express and BCrypt, this application allows for users to sign up for the app, log in to view user-specific information (e.g. their arranged meet-ups), edit their information, and create new meet-ups.

After the user signs up or logs in, the application does not store their password. Instead, their hashed password, one-way encrypted (with a salt added to it) with Bcrypt, is then stored in the database, along with their salt. The process after ensuring authentication was to create GET, POST, UPDATE, and DELETE routes for the different pages in the application, and ensuring that the process of creating, viewing, editing, and deleting meet-ups was easy to use for the client.

The goals for each daily sprint were to render front-end views for the different routes, with well-structured data in the back-end, based on wireframes that acted as the basis for the application. User stories were also factored into this sprint process.

### Relevant Links

[Trello Board](https://trello.com/b/6A38AkBR/coffee42)

## Features

### Current features
* Account creation.
* Login verification.
* Error messages for duplicate usernames (no duplicate usernames).
* Error messages for incorrect username/password combinations.
* Ability to see all pending and upcoming meetups upon login.
* Ability to edit their meet-ups.
* Ability to delete/cancel meet-ups.
* Ability to create a new meet-up with a random person.
* Ability to edit personal user information (excluding password).
* Ability to log out.

### Future features
* User can change their password.
* User can select from a greater variety of locations (using the Yelp API to access more coffeeshops).

## Application Security

To ensure that user data is protected, Coffee 4&#183;2 does not store any passwords in its user database. Instead, it stores hashed passwords, the passwords after they have been encrypted with a user-specific salt. These passwords are one-way encrypted so that there is no way to decrypt the user's entered password. Furthermore, in the login verificatin route, the user's input is put through the `strip()` and `trim()` methods in the Bcrypt package to ensure that the input was cleared of potentially malicious injections. After the user logs in, the user's session is stored and a middleware function, called `ensureLoggedIn`, is run every time a request is made so that the user can only see information that is specific to them. Upon the user logging out, that session information is deleted. Doing this ensures that malicious users are not able to hijack a user's session. The session key is also not included anywhere in the app's route.
