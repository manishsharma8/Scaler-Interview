# Interview Portal
> An online interview portal to schedule interview with participants

This repo contains the code of an Interview Portal where admin can schedule interviews with selected participants with no time clashes between them.

## Running Locally
### UI _(react)_:

Navigate to `/client`

- run `npm install`
- start up the development client with `npm start`

### Backend:
- Setup a [MongoDB Atlas Account](https://www.mongodb.com/cloud) and create a cluster for the database
- Navigate to `/server` and run `npm install` to download required dependencies

##### Setup Environment Variables
- Navigate to `/server` and set the following enviroment variables:
```shell
ATLAS_CONNECTION = 
```

## Technologies Used
Client Side:
- ReactJs
- Axios for API handling
- Tailwind CSS
- Momentjs

Server Side:
- MongoDB (Database) and Mongoose
- Express
