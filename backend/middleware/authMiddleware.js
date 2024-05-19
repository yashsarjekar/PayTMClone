const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authMiddleware(req, res, next){
    try {
        const authtoken = req.headers.authorization
        const token = authtoken.split(' ')[1];
        if (!token) {
            res.status(401).json(
                {
                    status: 401,
                    message: "Access Denied",
                    success: false
                }
            );
        }

        const decoded_data = await jwt.verify(token, 'shhhhh');
        const userExist = await User.findById(decoded_data.user_id);
        if (!userExist){
            res.status(401).json(
                {
                    status: 401,
                    message: "Access Denied",
                    success: false
                }
            );
        }else{
            const current_date_time =  Math.floor(Date.now() / 1000);
            if (current_date_time > decoded_data.expires_on){
                res.status(401).json(
                    {
                        status: 401,
                        message: "Token is expired, Please Login again",
                        success: false
                    }
                );
            }else{
                req.user_id = decoded_data.user_id;
                next();
            }
        }
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            success: false
        })
    }
    
}

module.exports = authMiddleware;