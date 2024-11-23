const path= require("path");
const express=require("express");
const connectToMonogoDB=require('./connect');



const app=express();
const PORT=8000;


//===================MONGODB DATABASE CONNECTION===================
connectToMonogoDB("mongodb://localhost:27017/eshramik").then( ()=>{
    console.log("Connected to MongoDB");
});
//=================================================================


//==============================middlewares===========================
app.use(express.urlencoded({extended:false}));


//====================================================================




//========================routes==========
const userRouter=require("./routes/user");




app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


app.get("/", (req,res)=>{
    res.render("home")
})
app.use('/user',userRouter);







app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})