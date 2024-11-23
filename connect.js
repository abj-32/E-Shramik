const mongoose=require('mongoose');

async function connectToMonogoDB(url){
    return mongoose.connect(url);
}

module.exports=connectToMonogoDB;