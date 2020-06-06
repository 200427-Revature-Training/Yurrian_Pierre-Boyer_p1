import { db } from '../daos/db';
import { User, UserRow } from '../models/User';

export function getUserById(ers_users_id: number): Promise<User> {
    const sql = `SELECT * FROM ers_users WHERE ers_users_id = $1`;

    return db.query<UserRow>(sql, [ers_users_id])
        .then(result => result.rows.map(row => User.from(row))[0]
    );
}
 
export function getUserRoleById(user_role_id: number): Promise<User> {
    const sql = `SELECT * FROM ers_users WHERE user_role_id = $1`;

    return db.query<UserRow>(sql, [user_role_id])
        .then(result => result.rows.map(row => User.from(row))[0]
    );
}
 