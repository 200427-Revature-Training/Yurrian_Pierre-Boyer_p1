import express from 'express';
import * as reimbursementsService from '../services/reimbursements-service';

export const reimbursementsRouter = express.Router();

/* 
    GET http://localhost:3000/reimbursements
    Retrieves an array of reimbursement tickets from database
*/
reimbursementsRouter.get('', (request, response, next) => {
    reimbursementsService.getAllTickets().then(reimbursements => {
        response.json(reimbursements);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/reimbursements/reimbAuthor/:reimbAuthor
    Retrieves an array of reimbursement tickets from the database by employee ID 
    If the ticket does not exist, sends 404 
*/
reimbursementsRouter.get('/:reimbAuthor', (request, response, next) => {
    const reimbAuthor = parseInt(request.params.reimbAuthor);
    reimbursementsService.getTicketsByAuthorId(reimbAuthor).then(reimbAuthor => {
        if (!reimbAuthor) {
            response.sendStatus(404);
        } else {
            response.json(reimbAuthor);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/* 
    GET http://localhost:3000/reimbursements/reimbursementType/:typeId
    Retrieves an array of reimbursement tickets from the database by its type ID 
    If the ticket does not exist, sends 404 (maybe use name) 
*/
reimbursementsRouter.get('/:typeId', (request, response, next) => {
    const typeId = parseInt(request.params.typeId);
    reimbursementsService.getTicketsByTypeId(typeId).then(typeId => {
        if (!typeId) {
            response.sendStatus(404);
        } else {
            response.json(typeId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/* 
    GET http://localhost:3000/reimbursements/statusId/:statusId
    Retrieves an array of reimbursement tickets from the database by status ID 
    If the ticket does not exist, sends 404
*/
reimbursementsRouter.get('/:statusId', (request, response, next) => {
    const statusId = parseInt(request.params.statusId);
    reimbursementsService.getTicketsByStatusId(statusId).then(statusId => {
        if (!statusId) {
            response.sendStatus(404);
        } else {
            response.json(statusId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/* 
    POST http://localhost:3000/reimbursements
    Creates a new reimbursement ticket and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
reimbursementsRouter.post('', (request, response, next) => {
    const reimbursement = request.body;
    reimbursementsService.saveTicket(reimbursement)
        .then(newReimbursement => {
            response.status(201);
            response.json(newReimbursement);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/*  PATCH http://localhost:3000/reimbursements
    Updates a current reimbursement ticket (must be denied or pending)
*/
reimbursementsRouter.patch('', (request, response, next) => {
    const reimbursement = request.body;
    reimbursementsService.updateTicket(reimbursement)
        .then(updatedReimbursement => {
            if (updatedReimbursement) {
                response.json(updatedReimbursement);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })

})