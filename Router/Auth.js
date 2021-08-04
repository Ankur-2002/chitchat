const router = require('express').Router();
const Client = require('../models/user')
const bcrypt = require('bcrypt');    

router.post('/register', async (req,res)=>{ 
    try{
        console.log(req.body)
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

// login
router.post('/login', async (req,res) =>{
  
    try{ 
    const user = await Client.findOne({ username : req.body.username}); 
    if(user !== null){
    const news = bcrypt.compare(req.body.password,user.password);
    //  decrypt password   
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