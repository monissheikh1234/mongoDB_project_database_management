const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/userdb').then(()=>console.log("Connection Successful")).catch((err)=>console.log(err))


const userschema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
img_url:{type:String,required:true}
})

    const User=mongoose.model('User',userschema)

    module.exports=User