const UserSchemaVal = require("../validations/userValidation")
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');
const mongoose = require("mongoose");
const Account = require("../models/accountModel");

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
    const session = await mongoose.startSession();
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
                success: false
            })
        }else {
            try {
                hash_password = await passwordHashing(request_body.password)
                session.startTransaction();
                const user = new User(
                    {
                        firstname: request_body.firstname,
                        lastname: request_body.lastname,
                        username: request_body.username,
                        email: request_body.email,
                        password: hash_password,
                        age: request_body.age
                    }
                );
                user.save().then(function sendSuccessResponse(){
                    const userId = user._id;
                    const account = new Account({
                        userId: userId,
                        balance: 0
                    })
                    
                    account.save();
                    session.commitTransaction();
                    res.status(200).json({
                        status: 200,
                        message: "User Successfully Register",
                        success: true
                    });
                });
            }catch(error) {
                console.log(error)
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
            success: false
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
            success: false
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
                token: token,
                success: true
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "Invalid Credentials",
                success: false
            });
        }
    }

}


async function userdata(req, res) {
    current_user_id = req.user_id;
    const users = await User.find();
    records = []

    for (let ind=0; ind < users.length; ind ++){
        if (current_user_id != users[ind]._id){
            const record = {
                firstname: users[ind].firstname,
                lastname: users[ind].lastname,
                email: users[ind].email,
                age: users[ind].age,
                _id: users[ind]._id
            };
            records.push(record);
        }
    }

    res.status(200).json(
        {
            status: 200,
            result: records.slice(0, 10),
            total_count: records.length,
            success:true
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
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            age: user.age,
            _id: user._id
        })),
        success: true
    })
}

async function userdata_based_on_id(req, res) {
    const users = await User.find({_id: req.query.to_id});
    records = []

    for (let ind=0; ind < users.length; ind ++){
        const record = {
            firstname: users[ind].firstname,
            lastname: users[ind].lastname,
            email: users[ind].email,
            age: users[ind].age,
            _id: users[ind]._id
        };
        records.push(record);
    }
    res.status(200).json(
        {
            status: 200,
            result: records.slice(0, 1),
            total_count: records.length,
            success:true
        }   
    )
}


module.exports = {
    register_user,
    login_validation,
    login,
    userdata,
    searchuser,
    userdata_based_on_id
};