const UserSchemaVal = require("../validations/userValidation")
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');



async function passwordHashing(password) {
    try{
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash_password = await bcrypt.hash(password, salt);
        return hash_password;
    } catch(error){
        throw error;
    }
}


async function register_user(req, res){
    const serializer =  UserSchemaVal.UserInputValidation.safeParse(req.body);
    if (!serializer.success){
        res.status(403).json({
            status: 403,
            message: "Invalid User Inputs",
            succes: false
        })
    }else{        
        request_body = req.body
        const userExist = await User.findOne({email: request_body.email});
        if (userExist){
            res.status(400).json({
                status: 400,
                message: "User Already Exist!",
                succes: false
            })
        }else {
            try {
                hash_password = await passwordHashing(request_body.password)
                const user = new User(
                    {
                        firstname: request_body.firstname,
                        lastname: request_body.lastname,
                        username: request_body.username,
                        email: request_body.email,
                        password: hash_password,
                        age: 26
                    }
                );
                user.save().then(function sendSuccessResponse(){
                    res.status(200).json({
                        status: 200,
                        message: "User Successfully Register",
                        succes: true
                    });
                });
            }catch(error) {
                res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    success: false
                })
            }     
        }
       
    }
}


function login_validation(req, res, next){
    const validation = UserSchemaVal.UserLoginValidation.safeParse(req.body)
    if (!validation.success){
        res.status(403).json({
            status: 403,
            message: "Invalid User Inputs",
            succes: false
        })
    }else{
        next();
    } 
}


async function login(req, res){
    email = req.body.email;
    password = req.body.password;
    const userExist = await User.findOne({email:email});
    if (!userExist){
        res.status(400).json({
            status: 400,
            message: "Email Does Not Exist",
            succes: false
        }); 
    }else{
        hashed_password = userExist.password;
        const result = await bcrypt.compare(password, hashed_password);
        if (result){
            const token = jwt.sign({
                user_id: userExist._id,
                user_email: userExist.email,
                expires_on: Math.floor(Date.now()/1000) + (60 * 60)
            }, 'shhhhh');
            res.setHeader('Set-Cookie', cookie.serialize('jwt', token));
            res.status(200).json({
                token: token
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "Invalid Credentials",
                succes: false
            });
        }
    }

}


async function userdata(req, res) {
    const users = await User.find();
    records = []

    for (let ind=0; ind < users.length; ind ++){
        const record = {
            firstname: users[ind].firstname,
            lastname: users[ind].lastname,
            email: users[ind].email,
            age: users[ind].age
        };
        records.push(record);
    }

    res.status(200).json(
        {
            status: 200,
            result: records.slice(0, 1),
            total_count: records.length
        }   
    )
}

async function searchuser(req, res) {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstname: {
                "$regex": filter
            }
        },
        {
            lastname: {
                "$regex": filter
            }
        }
    ]
    });
    records = []

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
}


module.exports = {
    register_user,
    login_validation,
    login,
    userdata,
    searchuser
};