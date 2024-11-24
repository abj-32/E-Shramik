const jwt= require('jsonwebtoken');

const secret="abj@72";



function createTokenForUser(user){
    const payload={
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    };

    const token=jwt.sign(payload,secret);
    return token;
}


function validateToken(token){
     if(!token){
        console.log('No token passed & found');
        return null;
     }

     try{
        return jwt.verify(token,secret);
     }
     catch(error){
        console.log("Token verification failed: ",error.message);
        return null;
     }
}


module.exports={
    createTokenForUser,validateToken
}