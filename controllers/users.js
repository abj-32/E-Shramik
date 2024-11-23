const User=require('../models/users');
const mongoose=require('mongoose');



async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;

    try{
        const existence= await User.doesEmailExist(email);
        if(existence){
            res.render("signup",{
                error:"Email already exists"
            });
        }
        else{
            await User.create({
                name,
                email,
                password
            });
        
            return res.redirect('/login');
        }
    }
    catch(error){
        console.error("Error checking email existence:", error);
    }

    
}


async function handleUserLogin(req,res){
    const {email,password}=req.body;

    try{
        await User.matchPassword(email,password);
        return res.redirect('/');
    }
    catch(error){
        return res.render("login",{
            error:"Incorrect email OR password",
        })
    }
}


module.exports={handleUserSignUp,handleUserLogin};