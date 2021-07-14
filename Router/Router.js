const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const router = require('express').Router();

// update user
router.put('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin)
    {
        if(req.body.password){
            try{
                req.body.password = await bcrypt.hash(req.body.password,10);
            }catch(err){
                res.json(err)
            // console.log(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body});
            res.status(200).json("Account has been updated")
        }
        catch(err)
        {
            res.json(err)
        }
    }
    else
    {
        res.status(404).json("You can update only our account");
    }
})


// User deleted 
router.delete('/:id',async (req,res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin)
    {   
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted");

        }catch(err)
        {
           return res.status(500).json(err);
        }
    }
    else{
       return  res.status(500).json("You can delete your own account ONLY")
    }

});

// get a user
router.get('/get/' , async (req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    console.log(1111111111111111111)
    try{
        const user = userId ? 
        await User.findById(userId) :
        await User.findOne({username : username});
        const {password,updateAt,...other} = user._doc
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json("No user")
    }
});

// get all friends

router.get('/allfriends/:userId',async (req,res)=>{
    console.log(22222222222222222222222)
    console.log(req.body)
    try{
        const UserId = req.params.userId;
        const friends = await User.findById(UserId);
        const all_friends = await Promise.all( 
            friends.following.map((value)=>{
                return  User.findById(value); 
            })
        );
        const friendsData = [];
        all_friends.map(user=>{
            const {_id,username,profilePicture} = user;
            friendsData.push({_id,username,profilePicture});
        })
       
        res.status(200).json(friendsData)
    }catch(err){
        res.status(200).json(err)
    }
})


// Follow a User
router.put('/:id/follow', async(req,res)=>{
    console.log(req.body.userId)
    console.log(req.params.id) 
    if(req.body.userId !== req.params.id)
    {
        try {
         
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId))
        {
            await user.updateOne({$push:{followers : req.body.userId}});
            await currentUser.updateOne({$push :{following : req.params.id}});
            res.status(200).json("User has been followed")
        }
        else
        {
            res.status(403).json("you already follow this user");
        }
        } catch (error) {
            console.log(error)         
        }}
    else
    {
        res.status(403).json("You can't follow yourself")
    }
});

// Unfollow  a user
router.put('/:id/unfollow', async (req,res)=>{ 
        if(req.params.id !== req.body.userId)
        {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if(user.followers.includes(req.body.userId))
                {
                    await user.updateOne({$pull : {followers : req.body.userId}});
                    await currentUser.updateOne({$pull : {following  : req.params.id}});
                    res.status(200).json("user has been unfollowed");
                }
                else
                {
                    res.status(200).json("You don't unfollow this user");
                }

            } catch (error) {
                res.status(200).json(error);
                
            }   
        }
        else
        {
            console.log("You cannot unfollow Yourself")
        }
})


module.exports = router;