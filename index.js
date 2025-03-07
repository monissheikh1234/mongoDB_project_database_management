const express=require('express');
const app=express();
const path=require('path');
const usermodel=require('./model/user');

// const multer = require('multer');  // Import multer
// const upload = multer();  // Initialize multer

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render("home")
})

app.get("/register",(req,res)=>{
res.render("register")
})


app.post("/createuser",async(req,res)=>{
    try{
        const user=new usermodel({
            name:req.body.uname,
            email:req.body.email,
            phone:req.body.phone,
            img_url:req.body.img_url
        })
        await user.save()
        res.redirect('/')
    }
    catch(e){
        res.send(e)
    }
})

app.get("/getuser", async(req,res)=>{
    try{
        const user=await usermodel.find()
        res.render("users",{users:user})
    }
    catch(e){
        res.send(e)
    }
})

app.get("/deleteAllusers",async(req,res)=>{
    
    try{
        
        const user=await usermodel.deleteMany({})
        res.json({ message: "All users deleted successfully"});
        
    }
    catch(err){
        res.send(err)
    }
})

app.get("/edituser/:id",async(req,res)=>{
    const user=await usermodel.findById(req.params.id);
res.render("edit",{user:user})
    
})

app.post("/edituser",async(req,res)=>{
    try{
        const user=await usermodel.findByIdAndUpdate(req.body.id,{ name:req.body.uname,email:req.body.email,phone:req.body.phone,img_url:req.body.img_url},{new:true})
        res.redirect("/") 
    }
    catch(e
        ){
        res.send(e)
    }})

    app.get("/deleteuser/:id" ,async(req,res)=>{
        const deleted_user=await usermodel.findByIdAndDelete(req.params.id)
        res.redirect("/")
    })

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})