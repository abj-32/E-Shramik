const express= require('express');
const {handleUserLogin,handleUserSignUp}=require('../controllers/users')
const userRouter=express.Router();


userRouter.get('/signup',(req,res)=>{
    res.render("signup");
});


userRouter.get('/login',(req,res)=>{
    res.render("login");
});


userRouter.post('/signup',handleUserSignUp);
userRouter.post('/login',handleUserLogin);
userRouter.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect('/user/login');
})

module.exports=userRouter;