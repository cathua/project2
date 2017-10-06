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
* Meet-ups could contain more than two individuals.

## Application Security

To ensure that user data is protected, Coffee 4&#183;2 does not store any passwords in its user database. Instead, it stores hashed passwords, the passwords after they have been encrypted with a user-specific salt. These passwords are one-way encrypted so that there is no way to decrypt the user's entered password. Furthermore, in the login verificatin route, the user's input is put through the `strip()` and `trim()` methods in the Bcrypt package to ensure that the input was cleared of potentially malicious injections. After the user logs in, the user's session is stored and a middleware function, called `ensureLoggedIn`, is run every time a request is made so that the user can only see information that is specific to them. Upon the user logging out, that session information is deleted. Doing this ensures that malicious users are not able to hijack a user's session. The session key is also not included anywhere in the app's route. The session includes a `SESSION_SECRET`, and the entire app has disabled the Express header.

## Models & Associations

Coffee 4&#183;2 utilizes three model, and one many-to-many association. The three models are `user`, `meetup`, and `coffeeshop`. The many-to-many association exists between `user` and `meetup`, as a single user has many meet-ups, and a single meet-up takes in two users. The model and its corresponding join table, `userMeetup`, is structured so that it can potentially take in more than two users, to facilitate group meet-ups. The entity-relationsip diagram is as follows.

![ERD](https://github.com/cathua/project2/blob/master/ERD.png "Entity-Relationship Diagram")

These models make it possible to use our RESTful routes, allowing us to GET, POST, PUT, and DELETE users and meet-ups.

## Routes

The user is able to, as stated in the overview, create a new user. This is done using a post request. Upon making a new account within the application, users are able to log in with another post request. If either the sign-in or log-in functions fail (either because of duplicate usernames or invalid username/password combinations), a get requests renders an error page. Within the app, get requests render the user's profile, their meet-ups, and edit pages. Put requests are able to update the user's information and meet-up information, post requests create new meet-ups, and delete requests remove meet-ups from the user's page.

## Testing

Using `supertest` and `supertest-session`, the tests are able to render secure pages and log in. Further information to come on this.

## Current Bugs

* Logging in with empty username/password fields, makes the application redirect to the `/login` route
..* This route has no content and renders an empty JSON object.
* The meet-up cards on the `/meetups` route have incorrect formatting for the date and time.
* The application does not check for duplicate usernames when the user changes their username in the `/users/edit` route.
* The log-in and sign-up modal boxes do not close when the user clicks on another modal box.
..* i.e., when the user clicks log-in and then clicks sign-up, the log-in modal box does not close.

## Overall Impressions

> Overall, this project definitely challenged me in ways that I needed to be challenged. It encouraged me to continue working outside my comfort zone with a robust CRUD app, while still rooting me in front-end development. While there are many things that I would love to continue improving, as of presentation day I am happy with what Ming and I have done and I'm glad we were able to create a cool and (hopefully!) meaningful MVP.

-Catherine

> Ming, if you have any impressions you should add them here!

-Mingquan

## Additional Credits and Shoutouts

Once again, thank you to the CODA program for giving us the opportunity to learn and create.

Thank you again to General Assembly's instructors and IA. Without their help our app would probably break much more, and look much more sad.

Thank you to __Parks and Recreation__ for being my go-to show to watch when I'm stressed. __-Catherine__

And lastly, major thanks to coffee for bringing people together. We hope you enjoy Coffee 4&#183;2. Hopefully it will inspire you to get to know someone over a cuppa.
