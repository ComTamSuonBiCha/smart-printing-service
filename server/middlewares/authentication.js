const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
    const authHeader = req.header('authorization');
    if(!authHeader) 
        return res.status(401).send('Access Denied');

    const token = authHeader.split(' ')[1];
    if(!token) 
        return res.status(401).send('Access Denied');

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) {
            res.status(400).send('Invalid Token');
        } else {
            req.user = decoded;
            next();
        }
    });
}

module.exports = authenticate;