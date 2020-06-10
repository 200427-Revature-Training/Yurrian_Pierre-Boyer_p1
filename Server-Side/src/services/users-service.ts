import { User } from '../models/User';
import * as usersDao from '../daos/users-daos'; 


/* Returns a certain user by id */
export function getUserById(ers_users_id: number): Promise<User> {

    return usersDao.getUserById(ers_users_id);
}

/* Returns a certain user's role by user's role id */
export function getUserRoleById(user_role_id: number): Promise<User[]> {

    return usersDao.getUserRoleById(user_role_id);
}

/* Returns a certain user by username*/
export function getUserByName(ers_username: string): Promise<User> {

    return usersDao.getUserByName(ers_username);
}