const router = require('express').Router();
const Client = require('../models/user')
const bcrypt = require('bcrypt');   
// register new user
router.post('/register', async (req,res)=>{ 
    try{
        // console.log(1)
        // password encrypt
        const password = await bcrypt.hash(req.body.password,10);
        // new user
        const User = await new Client({
            username : req.body.username,
            password : password,
            email : req.body.email,
        });
        const user = await User.save();
        res.status(200).json(user)
    }
    catch(err){
        res.status(505).json(err)
       
    } 
})

router.get('/register/like',(req,res)=>{
    // console.log(req);

    res.json({
        Ankur : "login succesfully"
    })
})

// login
router.post('/login', async (req,res) =>{
    console.log(req.body);
  
    try{

    const user = await Client.findOne({ username : req.body.username});
    // console.log(user)
    if(user !== null){
      //  decrypt password  
    const news = await bcrypt.compare(req.body.password,user.password)
    
    if(!news)
    res.status(505).send("Wrong Password");
    
    else if(user.email !== req.body.email)
    res.status(505).json("Wrong Email")
    // wrong password

    else
    res.status(200).json(user);
    }
    // invalid entry 
    else
    res.status(505).json("User not found");
    }
    catch(err)
    {
        
        console.log(err);
    }
})
module.exports = router;