import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
require('dotenv').config();
import { db } from './daos/db';
import { reimbursementsRouter } from './routers/reimbursements-router';
import { usersRouter } from './routers/users-router';


const app = express();



/* 
    Middleware Registration
*/
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


/* 
    Router Registration
*/
app.use('/reimbursements', reimbursementsRouter);
app.use('/users', usersRouter);
app.use('/login', require('./config/jwtAuth'));
app.use('/dashboard', require('./config/dashboard'));


/*
    Shows Webpage: May not need
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// /*
//     Authentication (Testing, Organize Later)
// */
// app.get('/users', (req, res) => {
  
// })

// app.post('/login', (req, res) => {
//   // Authenticate User
// })


process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});


/* 
    Port Listen
*/
const port = process.env.port || 5000;
app.set('port', port);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} `);
});
