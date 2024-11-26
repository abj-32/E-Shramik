const express=require('express');
const workerRouter=express.Router();
const {handleWorkerSignup,handleWorkerLogin} =require('../controllers/worker')
const {checkWorkerAuth}=require('../middlewares/workerAuth')


workerRouter.get('/shramikHome',checkWorkerAuth("workerToken"),(req,res)=>{
    res.render("shramikHome",{
        worker:req.worker
    });
});

workerRouter.get('/wSignup',(req,res)=>{
    res.render("wSignup");
});

workerRouter.get('/wLogin',(req,res)=>{
    res.render("wLogin");
});

workerRouter.post('/wSignup',handleWorkerSignup);
workerRouter.post('/wLogin',handleWorkerLogin);

module.exports=workerRouter;