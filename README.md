# unit02-project

Is it time for coffee for two? We hope you said yes.

Welcome to Coffee 4&#183;2.

## Overview

This application is a fullstack CRUD web application that randomly pairs users in its user database with others to facilitate meet-ups. By utilizing modules such as Express and BCrypt, this application allows for users to sign up for the app, log in to view user-specific information (e.g. their arranged meet-ups), edit their information, and create new meet-ups.

After the user signs up or logs in, the application does not store their password. Instead, their hashed password, one-way encrypted (with a salt added to it) with Bcrypt, is then stored in the database, along with their salt. The process after ensuring authentication was to create GET, POST, UPDATE, and DELETE routes for the different pages in the application, and ensuring that the process of creating, viewing, editing, and deleting meet-ups was easy to use for the client.

The goals for each daily sprint were to render front-end views for the different routes, with well-structured data in the back-end, based on wireframes that acted as the basis for the application. User stories were also factored into this sprint process.

### Relevant Links

[Trello Board](https://trello.com/b/6A38AkBR/coffee42)

## Features

* Account creation.
* Login verification.
* Error messages for duplicate usernames (no duplicate usernames).
* Error messages for incorrect username/password combinations.
* Ability to see all pending and upcoming meetups upon login.
* Ability to edit their meet-ups.
* Ability to create a new meet-up with a random person.
* Ability to edit personal user information (excluding password).
* Ability to log out.
