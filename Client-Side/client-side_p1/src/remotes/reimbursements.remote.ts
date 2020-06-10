import { internalAxios } from './internal-axios'
import { Reimbursement } from '../models/Reimbursement';


export const getAllReimbursements = async () => {
    const response = await internalAxios.get<Reimbursement[]>('/reimbursements');
    return response.data.map(reimbursement => {
        return reimbursement;
    });
}

export const createReimbursement = async (reimbursement: Reimbursement) => {
    const response = await internalAxios.post('/reimbursements', reimbursement);
    return true;
}