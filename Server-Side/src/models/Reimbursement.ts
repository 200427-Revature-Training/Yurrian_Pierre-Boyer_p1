export class Reimbursement {
    reimbId: number;
    reimbAmount: number;
    reimbSubmitted: Date;
    reimbResolved: Date;
    reimbDescription: string;
    reimbRecipt: string;
    reimbAuthor: number;
    reimbResolver: number;
    reimbStatusId: number;
    reimbTypeId: number;




    constructor(reimbId: number, reimbAmount: number, reimbSubmitted: Date, reimbResolved: Date, reimbDescription: string,
                reimbRecipt: string, reimbAuthor: number, reimbResolver: number, reimbStatusId: number, reimbTypeId: number) {

        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.reimbSubmitted = reimbSubmitted;
        this.reimbResolved = reimbResolved;
        this.reimbDescription = reimbDescription;
        this.reimbRecipt= reimbRecipt;
        this.reimbAuthor = reimbAuthor;
        this.reimbResolver = reimbResolver;
        this.reimbStatusId = reimbStatusId;
        this.reimbTypeId = reimbTypeId;
    }

/* 
    Static function for creating a Reimbursement instance
    from the structure the database gives us 
*/
    static from (obj: ReimbursementRow): Reimbursement {
        const reimbursement = new Reimbursement(
            obj.reimb_id, obj.reimb_amount, obj.reimb_submitted, obj.reimb_resolved, obj.reimb_description,
            obj.reimb_recipt, obj.reimb_author, obj.reimb_resolver, obj.reimb_status_id, obj.reimb_type_id
        );
        return reimbursement;
    }

}

export interface ReimbursementRow {
    reimb_id: number;
    reimb_amount: number;
    reimb_submitted: Date;
    reimb_resolved: Date;
    reimb_description: string;
    reimb_recipt: string;
    reimb_author: number;
    reimb_resolver: number;
    reimb_status_id: number;
    reimb_type_id: number;
}