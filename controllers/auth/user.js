const mongoose=require('mongoose');
const User=require('../../Models/user');
const {Validator}=require('node-input-validator');
const passwordHash=require('password-hash');
var jwt=require('jsonwebtoken');

function createToken(data){
    return jwt.sign(data,"DonateSmile");
}

const getTokenData=async(token)=>{
    let adminData=await User.findOne({token:token}).exec();
    return adminData;
};

// user registration

const register=async(req,res)=>{
    try{
        const check=await User.findOne({
           isDeleted:false,
           email:req.body.email,
           userType:req.body.userType,  
        });
    if(check){
        return res.status(400).json({status:false,message:"User already exists"});
    }    

    const userData={
        name:req.body.name,
        email:req.body.name,
        password:req.body.password,
        userType:req.body.userType,
        token:createToken(req.body),
    };
    const userInsert=new User(userData);
    const data=await userInsert.save();

    return res.status(200).json({status:true,message:"User Created successfully"});

    }catch(error){
        console.error(error);
        return res.status(500).json({status:false,message:"Server error, please try again",error:error.message});
    }
};

// user login

const login=async(req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await User.findOne({email,isDeleted:false});
     if(!user){
        return res.status(400).json({status:false,message:"Invalid email or password"});
     }
     const isMatch= user.comparePassword(password);
     if(!isMatch){
        return res.status(400).json({status:false,message:"Invalid email or password"});
     }

     return res.status(200).json({status:true,message:"Login successful"});

    }catch(error){
        console.error(error);
        return res.status(500).json({
            status:false,
            message:"server error, please try again",
            error:error.message,
        });
    }
};

module.exports={getTokenData,register,login};