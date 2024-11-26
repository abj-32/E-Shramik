const jwt =require('jsonwebtoken')

const secret="abj@23";

function createTokenforWorker(worker){
    const payload={
        id:worker._id,
        name:worker.name,
        phoneno:worker.phoneno
    }

    const workerToken=jwt.sign(payload,secret);
    return workerToken;
}

function validateWorkerToken(workerToken){
    if(!workerToken){
        console.log("workerToken missing");
        return null;
    }

    try{
        return jwt.verify(workerToken,secret);
    }
    catch(error){
        console.log("workerToken verification failed",error);
        return null;
    }
}

module.exports={
    createTokenforWorker,validateWorkerToken
}