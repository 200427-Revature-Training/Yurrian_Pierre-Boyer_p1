import express from 'express';
import * as usersService from '../services/users-service';

export const usersRouter = express.Router();

/* 
    GET http://localhost:3000/users/:ersUserId
    Retrieves a certain user from database
*/
usersRouter.get('/:ersUsersId', (request, response, next) => {
    const ersUsersId = parseInt(request.params.ersUsersId);
    usersService.getUserById(ersUsersId).then(ersUsersId => {
        if (!ersUsersId) {
            response.sendStatus(404);
        } else {
            response.json(ersUsersId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/users/userRoleId/:userRoleId
    Retrieves an array of users from database by role Id

    May have to try to get a certain users's role id
*/
usersRouter.get('/userRoleId/:userRoleId', (request, response, next) => {
    const userRoleId = parseInt(request.params.userRoleId);
    usersService.getUserRoleById(userRoleId).then(userRoleId => {
        if (!userRoleId) {
            response.sendStatus(404);
        } else {
            response.json(userRoleId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/users/ersUserName/:ersUserName
    Retrieves user from the database by username
    If the User does not exist, sends 404 
    
*/
usersRouter.get('/ersUserName/:ersUserName', (request, response, next) => {
    const ersUserName = (request.params.ersUserName);
        usersService.getUserByUserName(ersUserName).then(ersUserName => {
            if (!ersUserName) {
                response.sendStatus(404);
            } else {
                response.json(ersUserName);
            }
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
});