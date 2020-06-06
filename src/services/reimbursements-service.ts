import { Reimbursement } from '../models/Reimbursement';
import * as reimbursementsDao from '../daos/reimbursements-daos'; 

/* Returns an array of tickets */
export function getAllTickets(): Promise <Reimbursement[]> {
    
    return reimbursementsDao.getAllTickets();
}

/* Returns an array of tickets by employee id  */
export function getTicketsByAuthorId(ers_users_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getTicketsByAuthorId(ers_users_id);
}

/* Returns an array of tickets by reimbursement type */
export function getTicketsByTypeId(reimb_type_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getTicketsByTypeId(reimb_type_id);
}

/* Returns an array of tickets by status id  */
export function getTicketsByStatusId(reimb_status_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getTicketsByStatusId(reimb_status_id);
}


/* Saves the ticket  */
export function saveTicket(reimbursement: any): Promise<Reimbursement> {

    const newReimbursement = new Reimbursement(
        undefined,
        reimbursement.reimbAccount,
        new Date (reimbursement.reimbSubmitted),
        undefined,
        reimbursement.reimbDescription,
        undefined,
        reimbursement.reimbAuthor,
        undefined,
        reimbursement.reimbStatusId,
        reimbursement.reimbTypeId
    );

    if(reimbursement.reimbAccount && reimbursement.reimbSubmitted && reimbursement.reimbAuthor &&
        reimbursement.reimbDescription && reimbursement.reimbStatusId && reimbursement.reimbTypeId) {
        
        return reimbursementsDao.saveTicket(newReimbursement);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates the ticket */
export function updateTicket(input: any): Promise<Reimbursement> {
    

    const submitDate = input.reimbSubmitted && new Date(input.reimbSubmitted);

    const reimbursement = new Reimbursement(
        input.reimbId,
        input.reimbAccount,
        input.reimbSubmitted,
        input.reimbResolved,
        input.reimbDescription,
        input.reimbRecipt,
        input.reimbAuthor,
        input.reimbResolver,
        input.reimbStatusId,
        input.reimbTypeId
    );

    if (!reimbursement.reimbId) {
        throw new Error('400');
    }

    return reimbursementsDao.updateTicket(reimbursement);
}
