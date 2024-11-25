const mongoose =require('mongoose');
const {createHmac,randomBytes}=require("crypto");


const workerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true,
        unique:true
    },
    trade:{
        type:String,
        enum:["Electrician","Plumber","Carpenter","Mason/Bricklayer","Labrourer","Tiler"],
        required:true
    },
    city_of_work:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true
    },
    salt: {
        type: String,
    },
    wpassword:{
        type:String,
        required:true
    }
})

workerSchema.pre("save", function(next){

    const worker=this;

    if(!worker.isModified('wpassword')) return next();


    const salt=randomBytes(16).toString("hex");
    const whashedPassword=createHmac("sha256",salt).update(worker.wpassword).digest("hex");

    worker.salt=salt;
    worker.wpassword=whashedPassword;
    next();
})


workerSchema.static("matchWorkerPassword", async function(phoneno,wpassword){

    const worker= await this.findOne( {phoneno});
    
    if(!worker){
        console.log("FATAL: worker not found");
        throw new Error("Worker not found");
    }

    const {salt,wpassword:whashedPassword}=worker;
  const userProvidedHash=createHmac("sha256",salt).update(wpassword).digest("hex");

    if(whashedPassword != userProvidedHash){
        console.log("Incorrect Password");
        throw new Error("Incorrect password or username")
    }

    return true;
})

workerSchema.static("doesPhonenoExist", async function(phoneno){
    try{
        const worker=await this.findOne({phoneno});
        return !!worker
    }
    catch(error){
        console.log("Error checking Phone no existence");
        throw error;
    }
})


workerSchema.static("validatePhoneNo",function(phoneno){
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneno);
})

const worker=mongoose.model("worker",workerSchema);

module.exports=worker;

