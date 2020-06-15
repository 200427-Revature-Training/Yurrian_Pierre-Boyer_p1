export interface Reimbursement {
    reimbId?: number;
    reimbAmount: number;
    reimbSubmitted: Date | string;
    //reimb_resolved: Date; //After Aunth
    reimbDescription: string;
    //reimb_recipt: string; //Not needed
    reimbAuthor: number;
    //reimb_resolver: number; // Not needed until after submission
    reimbStatusId: number;
    reimbTypeId: number;
}