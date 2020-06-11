import jwt from 'jsonwebtoken';
require('dotenv').config();

export function jwtGenerator (ers_users_id: number) {
   const payload = {
        user: ers_users_id
   };

   return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '24hr'});
}

