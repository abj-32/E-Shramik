const cookieParser=require('cookie-parser')
const {validateWorkerToken}=require('../services/workerAuth')

function checkWorkerAuth(cookieName){
    return (req,res,next)=>{
        const workerTokenCookieValue=req.cookies[cookieName];

        if(!workerTokenCookieValue){
            return res.redirect("/worker/wLogin");
        }

        try{
            const workerPayload=validateWorkerToken(workerTokenCookieValue);
            req.worker=workerPayload;
            return next();
        }
        catch(error){
            console.log("error in getting worker payload in worker Middleware---> ",error);
        }

        return next();
    }
}

module.exports={
    checkWorkerAuth
}