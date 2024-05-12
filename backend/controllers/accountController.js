const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const AccountValidation = require("../validations/accountValidation");
const Transaction = require("../models/transactionModel");


async function credit(req, res){
    const session = await mongoose.startSession();
    user_id = req.user_id;
    const account_validation = AccountValidation.safeParse(req.body);
    if (!account_validation.success){
        res.status(403).json({
            status: 403,
            message: "Invalid Inputs",
            succes: false
        })
    }else{
        try{
            amount = req.body.amount;
            const accountExist = await Account.find({
                userId:user_id
            });
            if (accountExist.length > 0){
                session.startTransaction();
                new_balance = accountExist[0].balance + amount;
                await Account.updateOne(
                {
                    userId: user_id
                },
                {
                    balance: new_balance
                });
                const transaction = new Transaction(
                    {
                        userId: user_id,
                        balance: new_balance,
                        is_credited: true,
                        is_debited:false,
                        amount:amount
                    }
                )
                transaction.save();
                session.commitTransaction();
                res.status(200).json({
                    status: 200,
                    message: "Amount Credited",
                    succes: true
                });  
            }else{
                session.startTransaction();
                const account = new Account({
                    userId: user_id,
                    balance: amount
                })
                
                account.save().then(function success(){
                    const transaction = new Transaction(
                        {
                            userId: user_id,
                            balance: amount,
                            is_credited: true,
                            is_debited:false,
                            amount:amount
                        }
                    )
                    transaction.save();
                    session.commitTransaction();
                    res.status(200).json({
                        status: 200,
                        message: "Amount Credited",
                        succes: true
                    });
                })
            }
           
        }catch(error){
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                success: false
            })
        }
    }    

}

async function debit(req, res){
    const session = await mongoose.startSession();
    user_id = req.user_id;
    const account_validation = AccountValidation.safeParse(req.body);
    if (!account_validation.success){
        res.status(403).json({
            status: 403,
            message: "Invalid Inputs",
            succes: false
        })
    }else{
        try{
            amount = req.body.amount;
            const accountExist = await Account.find({
                userId:user_id
            });
            if (accountExist.length > 0){
                if (accountExist[0].balance >= amount) {
                    session.startTransaction();
                    balance = accountExist[0].balance - amount;
                    await Account.updateOne(
                    {
                        userId: user_id
                    },
                    {
                        balance:balance
                    });
                    const transaction = new Transaction(
                        {
                            userId: user_id,
                            balance: balance,
                            is_credited: false,
                            is_debited:true,
                            amount:amount
                        }
                    )
                    transaction.save();
                    session.commitTransaction();
                    res.status(200).json({
                        status: 200,
                        message: "Amount Debited",
                        succes: true
                    });  
                }else{
                    res.status(200).json({
                        status: 200,
                        message: "Insufficient Balance in your wallet",
                        succes: true
                    }); 
                }
                
            }else{
                const account = new Account({
                    user_id: user_id,
                    balance: 0
                })

                account.save().then(function success(){
                    res.status(200).json({
                        status: 200,
                        message: "Amount balance is already 0",
                        succes: true
                    });
                })
            }
           
        }catch(error){
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                success: false
            })
        }
    }    

}


async function transferfunds(req, res){
    const session = await mongoose.startSession();
    try{
        to_id = req.body.to
        amount = req.body.amount
        from_id = req.user_id
        from_account_exist = await Account.find({userId: from_id})
        to_account_exist = await Account.find({userId: to_id})
        if (from_account_exist.length > 0 && to_account_exist.length > 0){
            if (from_account_exist[0].balance >= amount) {
                session.startTransaction();
                const from_balance = from_account_exist[0].balance - amount;
                const to_balance = to_account_exist[0].balance + amount;
                await Account.updateOne(
                    {
                        userId: from_id
                    },
                    {  
                        balance: from_balance
                    }
                );
                await Account.updateOne(
                    {
                        userId: to_id
                    },
                    {  
                        balance: to_balance
                    }
                );
                const transaction1 = new Transaction(
                    {
                        userId: from_id,
                        balance: from_balance,
                        is_credited: false,
                        is_debited: true,
                        amount:amount,
                        secondUserID: to_id,
                    }
                )
                transaction1.save();
                const transaction2 = new Transaction(
                    {
                        userId: to_id,
                        balance: to_balance,
                        is_credited: true,
                        is_debited: false,
                        amount:amount,
                        secondUserID: from_id,
                    }
                )
                transaction2.save();
                session.commitTransaction();
                res.status(200).json({
                    status: 200,
                    message: "Payment Done Successfully",
                    succes: true
                });
            }else{
                res.status(200).json({
                    status: 200,
                    message: "Insufficient Balance in your wallet",
                    succes: true
                });
            }
            
        }else{
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                success: false
            })
        }
    }catch(error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            success: false
        })
    }
    
}

module.exports = {
    credit,
    debit,
    transferfunds
}