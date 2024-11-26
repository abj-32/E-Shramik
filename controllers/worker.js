const worker=require("../models/workers")
const mongoose=require('mongoose');



async function handleWorkerSignup(req,res){
    const {name, phoneno,trade,city_of_work,experience,wpassword}=req.body;

    try{
        if (!worker.validatePhoneNo(phoneno)) {
            return res.render("wSignup", {
                error: "Invalid phone number format. Please enter a valid phone number.",
            });
        }

        const doesExist = await worker.doesPhonenoExist(phoneno);
        if (doesExist) {
            return res.render("wSignup", {
                error: "Phone number already exists. Please use a different phone number.",
            });
        }
        
        await worker.create({
                name,
                phoneno,
                trade,
                city_of_work,
                experience,
                wpassword
        });
        return res.redirect("/worker/wLogin")
    }
    catch(error){
        console.error("Error checking Phone Number existence:", error);
    }

}

async function handleWorkerLogin(req,res){

    const {phoneno,wpassword}=req.body;

    try{
        const workerToken=await worker.matchWorkerPasswordandGenerateToken(phoneno, wpassword);
        return res.cookie("workerToken",workerToken).redirect('/worker/shramikHome');
    }
    catch(error){
        res.render('/wLogin',{
            error:"Incorrect email or password"
        })
    }
    
}


module.exports={
    handleWorkerLogin,handleWorkerSignup
}