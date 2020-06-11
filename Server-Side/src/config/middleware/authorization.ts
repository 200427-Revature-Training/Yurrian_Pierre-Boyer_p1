import jwt from 'jsonwebtoken';
require('dotenv').config();

export async function authorization (req, res, next) {
    try {
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json('Not Authorized');
        }

        const payload: any = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;

    } catch (err) {
      console.log(err.message);
      return res.status(403).json('Not Authorized');
    }

    next();
};