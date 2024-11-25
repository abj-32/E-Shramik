const path= require("path");
const express=require("express");
const connectToMonogoDB=require('./connect');
const cookieParser=require('cookie-parser');
const {checkForAuthentication}=require('./middlewares/authentication')



const app=express();
const PORT=8000;


//===================MONGODB DATABASE CONNECTION===================
connectToMonogoDB("mongodb+srv://connect2abj:MWj61zryxnc6zQm5@e-shramik.kwu6o.mongodb.net/?retryWrites=true&w=majority&appName=E-Shramik").then( ()=>{
    console.log("Connected to MongoDB");
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


app.get("/", (req,res)=>{
    res.render("home",{
        user:req.user
    })
})
app.use('/user',userRouter);
app.use('/worker',workerRouter);







app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})