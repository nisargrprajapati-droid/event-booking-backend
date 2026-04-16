import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, },
    email: { type: String, unique: true },
    gender: String,
    phone: String,
    password: { type: String,  },
    image: String,

    isBlocked:{
  type:Boolean,
  default:false
}
  },
  
  { timestamps: true }
);

userSchema.methods.jsonwebtoken = function (){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET_KEY  || " 629e2ueeij39eu9 " , {
      expiresIn :process.env.JWT_EXPIRE
    })
}

const User = mongoose.model('User',userSchema);

export default User;
