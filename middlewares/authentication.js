const cookieParser=require('cookie-parser')
const {validateToken} =require('../services/authentication')

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];

        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;// this is what we are injecting then in locals in index.js in home page rendering
            return next();
        }
        catch(error){
            console.log("error in getting user payload",error);
        }

        return next();
    }
}

function signupAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];

        if(!tokenCookieValue){
            return res.redirect('/user/login');
        }

        try{
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;// this is what we are injecting then in locals in index.js in home page rendering
            return next();
        }
        catch(error){
            console.log("error in getting user payload",error);
        }

        return next();
    }
}


module.exports={
    checkForAuthentication,signupAuthentication
}