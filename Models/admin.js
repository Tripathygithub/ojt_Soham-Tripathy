const mongoose=require("mongoose")
const passwordHash=require('password-hash')

const AdminSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneNo:{
        type:Number
    },
    token:{
        type:String
    },
    password:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },    
},{
    timestamps:true,
});




AdminSchema.methods.comparePassword= function(adminPassword){
    return passwordHash.verify(adminPassword,this.password)
}

module.exports=mongoose.model('admin',AdminSchema)