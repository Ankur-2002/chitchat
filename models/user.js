const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        max : 50,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 6
    },
    email : {
        type : String,
        required: true
    }
    ,
    profilePicture:{
        type:String,
        default: ""
    },
    CoverPicture:{
        type:String,
        default: ""
    },
    followers:{
        type:Array,
        default:[]
    },
    
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type : String,
        default:"",
        max : 50,
    },
    city:{
        type : String,
        max : 50,
    },
    from : {
        type : String,
        max:50
    },
    relationship:{
        type : Number,
        enum:[1,2,3],
    },
    
},{timestamps:true});

module.exports = mongoose.model('Chitchat_user',UserSchema);
