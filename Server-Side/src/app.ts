import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors'); 
const passport = require('passport');
const session = require('express-session');
const flash = require("express-flash");
//const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const bcrypt = require('bcryptjs');
import { db } from './daos/db';
import { reimbursementsRouter } from './routers/reimbursements-router';
import { usersRouter } from './routers/users-router';


const app = express();
app.use(cors());


/* 
    Middleware Registration
*/
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: process.env.SESSION_SECRET,
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* 
    Router Registration
*/
app.use('/reimbursements', reimbursementsRouter);
app.use('/users', usersRouter);

/*
    Configure Passport
*/
require("./config/passport")(passport);

// passport.use(new LocalStrategy((username, password, cb) => {
//     console.log('passport use');
//     db.query('SELECT * FROM ers_users WHERE ers_username=$1', [username], (err, result) => {
//       if(err) {
//         return cb(err)
//       }
  
//       if(result.rows.length > 0) {
//         const first = result.rows[0]
//         cb(null, { id: first.ers_users_id, username: first.ers_username })

        
//         bcrypt.compare(password, first.password, function(err, res) {
//           if(res) {
//             cb(null, { id: first.id, username: first.username, type: first.type })
//            } else {
//             cb(null, false)
//            }
//          })
//        } else {
//          cb(null, false)
//        }
       
//     })
//   }))

    
//   passport.serializeUser((user, done) => {
//     done(null, user.ers_users_id)
//   });
  
//   passport.deserializeUser((id, cb) => {
//     db.query('SELECT * FROM users WHERE ers_users_id = $1', [parseInt(id, 10)], (err, results) => {
//       if(err) {
//         return cb(err)
//       }
  
//       cb(null, results.rows[0])
//     })
// })



/*
    Shows Webpage
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    console.log(req.body.password);
    passport.authenticate('local', { successRedirect: '/reimbursements',
                                   failureRedirect: '/error',
                                   failureFlash: true
                                    });
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}











process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});


const port = process.env.port || 5000;
app.set('port', port);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} `);
});