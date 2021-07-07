const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet  = require('helmet');
const morgan = require('morgan');
const userrouter = require('./Router/Router');
const Authroute = require('./Router/Auth.js');
const postroute = require('./Router/post');
const multer = require('multer');
const path = require('path'); 
dotenv.config();
const port = process.env.PORT || 3000;

// middleware
app.use("/images",express.static(path.join(__dirname,'server/images')));
app.use(express.static('UI/build'));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(express.urlencoded({extended : true}))
// console.log(process.env.REACT_APP_PUBLIC_FOLDER)
mongoose.connect("mongodb+srv://Chitchat:Chitchat@chitchat.lpgwo.mongodb.net/Chitchat?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{
    console.log('database is visible')
  
})
.catch((err)=>{
    console.log(err)
});  
const storage = multer.diskStorage({

    destination : './server/images',
    filename : function(req, file , cb){  
        console.log(req.body.Fname)
    cb(null , req.body.Fname);
    }

});

const upload = multer({ storage });
//                                  formfield name
app.post("/api/upload",upload.single("file"),(req,res)=>{
 
    try {
     res.status(200).json("Successfull upload")
    }catch (error) {
    console.log(error)
}
})
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '/UI/build/index.html'));
});
app.listen(port, ()=>{
    console.log("backend is visible" + port);
});


if(process.env.NODE_ENV == 'production')
{
    app.use(express.static('/chitchat/build'))
}


// console.log(1);
app.use('/api/user',userrouter);
app.use("/api/auth",Authroute);
app.use("/api/post",postroute);


