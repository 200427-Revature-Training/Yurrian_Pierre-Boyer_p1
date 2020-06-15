const router = require('express').Router();
import { db } from '../daos/db';
import { authorization } from './middleware/authorization';

router.get('/', authorization, async (req, res) => {
    try {
        const user = await db.query('SELECT ers_username FROM ers_users WHERE ers_users_id = $1', 
        [req.user]);

        res.json(user.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error'); 
    }
})

module.exports = router;