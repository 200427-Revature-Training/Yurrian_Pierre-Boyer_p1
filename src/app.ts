import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import bcrypt from 'bcryptjs'; 
require('dotenv').config();
import { db } from './daos/db';
import { reimbursementsRouter } from './routers/reimbursements-router';
import { usersRouter } from './routers/users-router';
//import { loginRouter } from './routers/login-router'; 


const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy((username, password, cb) => {
  console.log(username);
    db.query('SELECT ers_users_id, ers_username, ers_password, user_role_id FROM ers_users WHERE ers_username=$1', [username], (err, result) => {
      if(err) {
        console.log('Error when selecting user on login', err);
        return cb(err)
      }
  console.log (result);
      if(result.rows.length > 0) {
        const first = result.rows[0]
        bcrypt.compare(password, first.ers_password, function(err, res) {
          if(res) {
            cb(null, { id: first.ers_users_id, username: first.ers_username, role: first.user_role_id })
           } else {
             console.log(err);
            cb(null, false)
           }
         })
       } else {
         cb(null, false)
       }
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, cb) => {
    db.query('SELECT ers_users_id, ers_username, ers_password, user_role_id FROM ers_users WHERE ers_users_id=$1', [parseInt(id, 10)], (err, results) => {
      if(err) {
        console.log('Error when selecting user on session deserialize', err);
        return cb(err)
      }
  
      cb(null, results.rows[0])
    })
  })


const app = express();
//require('./config/passport');
/* 
    Middleware Registration
*/
app.use(bodyParser.json());


/* 
    Router Registration
*/
app.use('/reimbursements', reimbursementsRouter);
app.use('/users', usersRouter);

/*
    Configure Passport
*/
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/reimbursements',
                                   failureRedirect: '/error'
                                        })
);








process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});


const port = process.env.port || 3000;
app.set('port', port);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} `);
});