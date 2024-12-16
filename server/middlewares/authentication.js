const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
    const authHeader = req.header('authorization');
    if(!authHeader) 
        return res.status(401).send('Access Denied');

    const token = authHeader.split(' ')[1];
    console.log(token);
    if(!token) 
        return res.status(401).send('Access Denied');

    jwt.verify(token, 'the-strong-secret', (err, decoded) => {
        if(err) {
            res.status(401).send('Invalid Token');
        } else {
            req.userInfo = decoded;
            next();
        }
    });
}

module.exports = authenticate;