const mongoose = require("mongoose");
const {createHmac,randomBytes}=require("crypto");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "SHRAMIK", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", function (next){

    const user=this;

    if(!user.isModified('password')) return next();


    const salt=randomBytes(16).toString("hex");
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");

    user.salt=salt;
    user.password=hashedPassword;
    next();

});

UserSchema.static("matchPassword",async function(email,password){
  const user=await this.findOne( {email});

  if(!user){
    console.log("FATAL :user not found");
    throw new Error("USER NOT FOUND");
  }

  const { salt,password:hashedPassword}=user;

  const userProvidedHash=createHmac("sha256",salt).update(password).digest("hex");


  if(hashedPassword != userProvidedHash){
    console.log("Incorrect Password");
    throw new Error("Incorrect password or username")
  }


})

UserSchema.static("doesEmailExist",async function(email){

  try{
    const user=await this.findOne({email});
    return !!user;
  }
  catch(error){
    console.log("Error checking email existence");
    //throw error;
  }
})


const User=mongoose.model("user",UserSchema);

module.exports=User;
