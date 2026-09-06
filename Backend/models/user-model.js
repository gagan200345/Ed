const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  }

})

//jwt instance method
userSchema.methods.generateToken = async function(){
try{
return jwt.sign({
  //payload
userId: this._id.toString(),
email:this.email,
isAdmin: this.isAdmin,
},
//Signature
process.env.JWT_SECRET_KEY, 
{
expiresIn:"30d",
}

);
}catch(error){
console.log(error);
throw error;
}
}


const User = mongoose.model("User",userSchema);

module.exports = User;