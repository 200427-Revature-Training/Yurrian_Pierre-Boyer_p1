export class User {
    ersUsersId: number;
    ersUsername: string;
    ersPassword: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userRoleId: number;
    



    constructor(ersUsersId: number, ersUsername: string, ersPassword: string, userFirstName: string, userLastName: string,
                 userEmail: string, userRoleId: number) {

        this.ersUsersId = ersUsersId;
        this.ersUsername = ersUsername;
        this.ersPassword = ersPassword;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail= userEmail;
        this.userRoleId = userRoleId;
    }

/* 
    Static function for creating a Reimbursement instance
    from the structure the database gives us \
*/
    static from (obj: UserRow): User {
        const user = new User(
            obj.ers_users_id, obj.ers_username, obj.ers_password, obj.user_first_name, obj.user_last_name,
            obj.user_email, obj.user_role_id
        );
        return user;
    }

}

export interface UserRow {
    ers_users_id: number;
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number;

}
