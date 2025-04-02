const mongoose=require('mongoose');
const passwordHash=require('password-hash');

const userSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true,
     },
     email:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     },
     token:{
      type:String,
     },
     userType:{
      type:String,
      enum:["company","user"],
      required:true,
     },
     isDeleted:{
      type:Boolean,
      default:true,
     } 
},{
    timestamps:true,
});

userSchema.methods.comparePassword=function (userPassword){
   return passwordHash.verify(userPassword,this.password);
}

const User=mongoose.model('User',userSchema);

module.exports=User;