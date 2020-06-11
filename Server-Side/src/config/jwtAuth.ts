const router = require('express').Router();
import { db } from '../daos/db';
import bcrypt from 'bcryptjs';
import { jwtGenerator } from '../config/jwtGenerator';
import { validation } from './middleware/validation';
import { authorization } from './middleware/authorization';


// Login Route: All Users
// This router could posibly be used to seperate employees from managers

router.post('/', validation, async (req, res) => {
   try {
       // Deconstruct req.body
       const { ersUsername, ersPassword } = req.body;

       // Get username
       const user = await db.query('SELECT * FROM ers_users WHERE ers_username = $1',
       [ersUsername]
       );

       // Check existence
       if(user.rows.length === 0) {
           return res.status(401).json('Username or Password is incorrct');
       }

       // Check password if match with database password
       const validPassword = await bcrypt.compare(ersPassword, user.rows[0].ers_password);
       
       if(!validPassword) {
           return res.status(401).json('Username or Password is incorrect');
       }

       // Give user jwt token
       const token = jwtGenerator(user.rows[0].ers_users_id);

       res.json({ token });

   } catch (err) {
       console.log(err.message);
       res.status(500).send('Server Error');
   }
});

router.get('/verified', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;


