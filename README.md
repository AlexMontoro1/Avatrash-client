# Avatrash

## [See the App!](https://avatrash.netlify.app/)

![App Logo](https://i.imgur.com/iRU2Huc.png)

## Description

This project in general is an interactive website between users who can create their own avatars and see the ones that others have created, be able to comment on them and like them.

#### [Client Repo here](https://github.com/AlexMontoro1/Avatrash-client)
#### [Server Repo here](https://github.com/AlexMontoro1/Avatrash-server)

## Backlog Functionalities

-Email verification 
-Live chat
-Random avatar generation
-Avatar war (compete against another person and see who gets the most likes) 
-Implement new accessories and new avatar models

## Technologies used

-HTML
-CSS
-Javascript
-React
-axios
-React Context
-Cloudinary
-Bootstrap
-MongoDB
-MongoAtlas
-Netlify
-GitHub

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **homepage** - I can click on create avatar , go to catalog, signin and login.
- **sign in** - As a user you can register without problems using a user email and password.
- **login** - As a user you can login to the page with your email and password and thus be able to access new features.
- **logout** - As a user you can log out and exit your account to be able to re-enter or navigate without being logged in.
- **avatar create** - By clicking on the create home button or on the create avatar dropdown menu, you can create a custom avatar that will be saved to your profile and displayed in the avatar catalog.
- **catalog** - As a logged or unlogged user you can see the catalog of avatars created by the community, search by name or filter by popularity (number of likes).
- **avatar details** - As a user without login you can see the image of the avatar and its characteristics, even download a png image of the avatar in question, but if you are logged in you can even put comments and like the avatars, if you are the creator of the avatar, you can edit it or delete it.
- **profile** - As a logged in user, you can see your profile, modify it and see all the avatars you have created in a drop-down mode where you can click on the one you want to see its details.
- **navbar** - From the navbar it depends on whether you are logged in or not because you can go to the catalog, to create an avatar, to your profile, to registration, to login, to your profile, to disconnect, and even if you are an admin see your administrator page.
- **footer** - Here as a user you can see a footer with developer contact information, and you can even send feedback.
- **admin** - Here only as an administrator, you can see the feedback that users have sent about the page.

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | anon only `<IsAnon>`     | Signup form modal, navigate to homepage after signup          |
| `/login`                  | Login           |                   | anon only `<IsAnon>`     | Login form modal,navigate to homepage after login             |
| `/profile`                | Profile         | EditProfile       | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/avatar/create`          | AvatarCreate    | Create avatar     | user only `<IsPrivate>`  | form to create an avatar                                      |
| `/avatar/details`         | GamesEdit       | Comments,edit     | user only `<IsPrivate>`  | Shows avatar details and actions                              |
                                                ,delete,download
| `/catalog`                | Catalog         |                   | public                   | Shows all avatars on catalog                                  |

## Other Components

- Navbar
- Footer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()
- Avatar Service
  -  avatar()
  -  avatar.crate(new)
  -  avatar.details(id)
  -  avatar.edit(id, edited)
  -  avatar.delete(id)
  -  avatar.like(id)
- Comment Service
  -  comment.create(id,new)
  -  comment.delete(id,id)
- Feedback Service
  -  feedback.create(new)
  -  feedback()
-  Profile Service
  -  profile(user)
  -  profile.edit(user,edited)
  -  upload(imgData)
  
- External Library
  -  avataaars
  
## Context

- auth.context
  
## Links

### Collaborators

[Alex Montoro](https://github.com/AlexMontoro1)

### Project

[Repository Link Client](https://github.com/AlexMontoro1/Avatrash-client)

[Repository Link Server](https://github.com/AlexMontoro1/Avatrash-server)

[Deploy Link](https://avatrash.netlify.app/)

