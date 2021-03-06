import { db } from './db';
import { Reimbursement, ReimbursementRow } from '../models/Reimbursement';

export function getAllReimbursements(): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM ers_reimbursement';

    return db.query<ReimbursementRow>(sql, []).then(result => {
        const rows: ReimbursementRow[] = result.rows;

        const reimbursement: Reimbursement[] = rows.map(row => Reimbursement.from(row));
        return reimbursement;
    });    
}

export function getReimbursementsByAuthorId(reimb_author: number): Promise<Reimbursement[]> {
    const sql = `SELECT * FROM ers_reimbursement WHERE reimb_author = $1`;

    return db.query<ReimbursementRow>(sql, [reimb_author]).then(result => {
        const rows: ReimbursementRow[] = result.rows;

        const reimbursement: Reimbursement[] = rows.map(row => Reimbursement.from(row));
        return reimbursement;
    });    
    
}

export function getReimbursementsByTypeId(reimb_type_id: number): Promise<Reimbursement[]> {
    const sql = `SELECT * FROM ers_reimbursement WHERE reimb_type_id = $1`;

    return db.query<ReimbursementRow>(sql, [reimb_type_id]).then(result => {
        const rows: ReimbursementRow[] = result.rows;

        const reimbursement: Reimbursement[] = rows.map(row => Reimbursement.from(row));
        return reimbursement;
    });

}

export function getReimbursementsByStatusId(reimb_status_id: number): Promise<Reimbursement[]> {
    const sql = `SELECT * FROM ers_reimbursement WHERE reimb_status_id = $1`;
    
    return db.query<ReimbursementRow>(sql, [reimb_status_id]).then(result => {
        const rows: ReimbursementRow[] = result.rows;
    
        const reimbursement: Reimbursement[] = rows.map(row => Reimbursement.from(row));
        return reimbursement;
    });
        
}

export function saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = `INSERT INTO ers_reimbursement (reimb_amount, reimb_submitted, reimb_description,
        reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    
      return db.query<ReimbursementRow>(sql, [
        reimbursement.reimbAmount,
        reimbursement.reimbSubmitted,
        reimbursement.reimbDescription,
        reimbursement.reimbAuthor,
        reimbursement.reimbStatusId,
        reimbursement.reimbTypeId
    ]).then(result => result.rows.map(row => Reimbursement.from(row))[0]);
} 


export function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = `UPDATE ers_reimbursement SET reimb_amount = COALESCE($1, reimb_amount), \
        reimb_submitted = COALESCE($2, reib_submitted), reimb_description = COALESCE($3, reimb_description), \
        reimb_author = COALESCE($4, reimb_author), reimb_resolver = COALESCE($5, reimb_resolver), \
        reimb_status_id = COALESCE($6, reimb_status_id), reimb_type_id = COALESCE($6, reimb_type_id),
        WHERE reimb_id = $7 RETURNING *`;

    const params = [reimbursement.reimbAmount,
                    reimbursement.reimbSubmitted,
                    reimbursement.reimbDescription,
                    reimbursement.reimbAuthor,
                    reimbursement.reimbResolver,
                    reimbursement.reimbStatusId,
                    reimbursement.reimbTypeId
        ];

    return db.query<ReimbursementRow>(sql, params)
        .then(result => result.rows.map(row => Reimbursement.from(row))[0]
    );
    
}
