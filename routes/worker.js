const express=require('express');
const workerRouter=express.Router();
const workerSchema=require('../models/workers')
const {handleWorkerSignup,handleWorkerLogin,handleWorkerInfoRendering} =require('../controllers/worker')
const {checkWorkerAuth}=require('../middlewares/workerAuth')


workerRouter.get('/shramikHome',checkWorkerAuth("workerToken"),async(req,res)=>{
    const workerId=req.worker.id;
    //console.log(workerId);
    const workerProfile=await workerSchema.findById(workerId);
    res.render("shramikHome",{
        worker:workerProfile
    });
});

workerRouter.get('/wSignup',(req,res)=>{
    res.render("wSignup");
});

workerRouter.get('/wLogin',(req,res)=>{
    res.render("wLogin");
});

workerRouter.get('/:id',handleWorkerInfoRendering);


workerRouter.post('/wSignup',handleWorkerSignup);
workerRouter.post('/wLogin',handleWorkerLogin);

module.exports=workerRouter;