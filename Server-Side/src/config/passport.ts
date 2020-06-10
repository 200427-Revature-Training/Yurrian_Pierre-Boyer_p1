import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import { db } from '../daos/db';
const bcrypt = require('bcryptjs');
import * as usersDao from '../daos/users-daos'; 




function initialize(passport: any) {
  console.log('Initialized');


    const authenticateUser = (username: string, password: string, done: Function) => {
    console.log(username, password);
        // Match User
        db.query(
          `SELECT * FROM ers_users WHERE ers_username = $1`,
          [username],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows);
    
            if (results.rows.length > 0) {
              const user = results.rows[0];

                    // Match password
                    bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
                        if (err) throw err

                        if (isMatch) {
                            return done(null, user, { message: 'Login successful.' })
                        } else {
                            return done(null, false, { message: 'Invalid username/password.' })
                        }
                    });
                } else {
                  // No user
          return done(null, false, { message: "No user with that email address"
          });
        }
      }
    );
  };


passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password"},
    authenticateUser));

passport.serializeUser((user: any, done: any) => done(null, user.id))

passport.deserializeUser((id: number, done: any) => {
  db.query(`SELECT * FROM ers_users WHERE ers_users_id = $1`, [id], (err, results) => {
    if (err) {
      return done(err);
    }
    console.log(`ID is ${results.rows[0].id}`);
    return done(null, results.rows[0]);
  });
});
}

module.exports = initialize;

    // passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     console.log('in passport');
    //     var user = usersDao.getUserByName('yuri');
    //     return done(null, user);
    //   }
    // ));




 // usersDao
        //     .getUserByName(username)
        //     .then((user: any) => {
        //         if (!user) {
        //             return done(null, false, 'Invalid username/password.')
        //         } else {


