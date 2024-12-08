require('dotenv').config();
const path= require("path");
const express=require("express");
const connectToMonogoDB=require('./connect');
const cookieParser=require('cookie-parser');
const worker=require('./models/workers')
const {checkForAuthentication}=require('./middlewares/authentication')



const app=express();
const PORT= process.env.PORT || 8000;


//===================MONGODB DATABASE CONNECTION===================
connectToMonogoDB(process.env.MONGO_URL).then( ()=>{
    console.log("Connected to MongoDB");//"mongodb+srv://connect2abj:MWj61zryxnc6zQm5@e-shramik.kwu6o.mongodb.net/?retryWrites=true&w=majority&appName=E-Shramik"
});
//=================================================================


//==============================middlewares===========================
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication("token")); 


//====================================================================




//========================routes==========
const userRouter=require("./routes/user");
const workerRouter=require("./routes/worker")

//========================================




app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


app.get("/", async(req,res)=>{
    const allworkers=await worker.find({});
    res.render("home",{
        user:req.user,
        shramik:allworkers
    })
})
app.use('/user',userRouter);
app.use('/worker',workerRouter);







app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})