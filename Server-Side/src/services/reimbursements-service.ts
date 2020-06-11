import { Reimbursement } from '../models/Reimbursement';
import * as reimbursementsDao from '../daos/reimbursements-daos'; 

/* Returns an array of Reimbursements */
export function getAllReimbursements(): Promise <Reimbursement[]> {
    
    return reimbursementsDao.getAllReimbursements();
} 

/* Returns an array of Reimbursements by employee id  */
export function getReimbursementsByAuthorId(ers_users_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getReimbursementsByAuthorId(ers_users_id);
}

/* Returns an array of Reimbursements by reimbursement type */
export function getReimbursementsByTypeId(reimb_type_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getReimbursementsByTypeId(reimb_type_id);
}

/* Returns an array of Reimbursements by status id  */
export function getReimbursementsByStatusId(reimb_status_id: number): Promise<Reimbursement[]> {

    return reimbursementsDao.getReimbursementsByStatusId(reimb_status_id);
}


/* Saves the Reimbursement  */
export function saveReimbursement(reimbursement: any): Promise<Reimbursement> {

    const newReimbursement = new Reimbursement(
        undefined,
        reimbursement.reimbAmount,
        new Date(), //Set sunbmitted date to current time
        undefined,
        reimbursement.reimbDescription,
        undefined,
        reimbursement.reimbAuthor, //This must be known from login
        undefined,
        reimbursement.reimbStatusId, //Hardcode Pending (1)
        reimbursement.reimbTypeId
    );

    if(reimbursement.reimbAmount && reimbursement.reimbSubmitted && reimbursement.reimbAuthor &&
        reimbursement.reimbDescription && reimbursement.reimbStatusId && reimbursement.reimbTypeId) {
        
        return reimbursementsDao.saveReimbursement(newReimbursement);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates the Reimbursement */
export function updateReimbursement(input: any): Promise<Reimbursement> {
    

    const submitDate = input.reimbSubmitted && new Date(input.reimbSubmitted);

    const reimbursement = new Reimbursement(
        input.reimbId,
        input.reimbAmount,
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

    return reimbursementsDao.updateReimbursement(reimbursement);
}
