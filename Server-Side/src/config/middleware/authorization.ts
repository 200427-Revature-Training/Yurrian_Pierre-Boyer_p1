import jwt from 'jsonwebtoken';
require('dotenv').config();

export const authorization = async (req, res, next) => {

  const authHeader = req.headers('authorization');

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {return res.sendStatus(401)} // if there isn't any token

  const revealed = await jwt.verify(req.body.token, process.env.jwtSecret as string, (err: any, user: any) => {
    console.log(err);
    if (err) {return res.sendStatus(403)}
    req.user = revealed;

    next();
  })
};


// try {
    //     const jwtToken = req.header('token');

    //     if (!jwtToken || jwtToken === undefined) {
    //         res.status(403).json('Not Authorized');
    //         //res.redirect('/login');
    //     }

    //     const payload: any = jwt.verify(jwtToken, process.env.jwtSecret);

    //     req.user = payload.user;

    // } catch (err) {

    //   console.log(err.message);
    //   return res.status(500).json('Not Authorized');
    // }