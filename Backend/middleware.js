const { JWT_SECRET } = require('./config');

const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    
    const authHeader = req.headers.authorization;


    if(!authHeader /* || !authHeader.startWith('Bearer ') */)
    {
        return res.status(403).json({
            msg:"Incorrect Inputs"
        });
    }
   
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token , JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else
        {
            return res.status(403).json({});
        }
    } catch(err) {
        console.log(err);
        return res.status(403).json({
            msg:"Incorrect Inputs"
        });
    }
};

module.exports = {
    authMiddleware
}
