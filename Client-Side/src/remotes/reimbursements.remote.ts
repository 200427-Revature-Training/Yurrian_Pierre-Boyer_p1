import { internalAxios } from './internal-axios'
import { Reimbursement } from '../models/Reimbursement';


export const getAllReimbursements = async () => {
    const response = await internalAxios.get<Reimbursement[]>('/reimbursements');
    return response.data.map(reimbursement => {
        return reimbursement;
    });
}

export const getOneReimbursement = async () => {
    const response = await internalAxios.get<Reimbursement>('/reimbursements');
        return true;
}

export const createReimbursement = async (reimbursement: Reimbursement) => {
    const response = await internalAxios.post('/reimbursements', reimbursement);
    return true;
}

export const patchReimbursement = async (reimbursement: Reimbursement) => {
    const response = await internalAxios.patch('/reimbursements', reimbursement);
    return true;
}

