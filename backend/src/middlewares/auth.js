const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization; //Fetches the token from the authorization field in request header

    if(!authHeader){
        return res.status(401).send({ message: 'No token provided' });
    };

    //Splits the "Bearer" text from the Token hash
    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({ message: 'Authorization Header Error' });
    }

    //Isolates the scheme and token so we can validate the Scheme starts with "Bearer"
    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ message: 'Token malformed' });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: 'Invalid Token' });
        }//Finish checking if the token is valid

        req.userId = decoded.id;
        return next();
    })

};