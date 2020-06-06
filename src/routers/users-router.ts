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
        response.json(ersUsersId);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/users/userRoleId/:userRoleId
    Retrieves an array of reimbursement tickets from database
*/
usersRouter.get('/:userRoleId', (request, response, next) => {
    const userRoleId = parseInt(request.params.userRoleId);
    usersService.getUserRoleById(userRoleId).then(userRoleId => {
        response.json(userRoleId);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});