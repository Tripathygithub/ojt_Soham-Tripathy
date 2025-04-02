const mongoose=require('mongoose');
const Admin=require('../../Models/admin');
const passwordHash=require('password-hash');
const {Validator}=require('node-input-validator');
var jwt =require('jsonwebtoken');

function createToken(data){
    return jwt.sign(data,'DonateSmile');
}

const getTokenData=async (token) =>{
    let adminData=await Admin.findOne({token:token}).exec();
    return adminData;
};


//Register Admin
const register=async(req,res)=>{
  const v=new Validator(req.body,{
    email:"required|email",
    password:"required",
  });

  let matched=await v.check();
  if(!matched){
    return res.status(400).json({status:false,error:v.errors,message:"validation failed"});
  }

  let adminData={
    ...req.body,
    password:passwordHash.generate(req.body.password),
    token:createToken(req.body),
  };

  try {
    const adminInsert=new Admin(adminData);
    await adminInsert.save();

    return res.status(201).json({status:true,message:"Admin created successfully",data:adminInsert});

  } catch (error) {
     console.error("Error creating admin:",error);
     return res.status(500).json({
        status:false,
        message:"Server error",
        error:error.message,
     });
  }
};

//Admin Login

const login=async(req,res)=>{
    const v=new Validator(req.body,{
        email:"required",
        password:"required",
    });

    let matched=await v.check();
    if(!matched){
        return res.status(400).json({status:false,error:v.errors});
    }

    try{
        const admin=await Admin.findOne({email:req.body.email});
        if(admin && admin.comparePassword(req.body.password)){
            admin.password=null;
        return res.status(200).json({status:true,message:"Admin logged in successfully",data:admin});

        }else{
            return res.status(401).json({status:false,message:"Invalid email or password"});

        }
    }catch(error){
        console.error("Login error :",error);
        return res.status(500).json({
            status:false,
            message:"Server error",
            error:error.message,
        });
    }
};

module.exports={register,getTokenData,login};
