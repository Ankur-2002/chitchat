const router = require('express').Router();
const Post = require('../models/post');
const user = require('../models/user');
const fs = require('fs')


// create a post
router.post('/', async (req,res)=>{
  
const newpost = await new Post(req.body); 
 
try{
   await newpost.save();
    res.status(200).json(newpost)
}   
catch(err)
{
    res.json(err)
}

})
// update a post
router.put('/:id',async (req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId)
    {   
        const n = await post.updateOne({$set : req.body});
        res.status(200).json("Post updated");
    }
    
    else
    {
        res.status(403).json("Post Not updated")
    }
    }

    catch(err)
    {
        res.status(505).json(err)
    }

})


// like a post 
router.put('/:id/like', async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);  
        if(!post.likes.includes(req.body.userId))
        {
            await post.updateOne({$push : {likes : req.body.userId}});
            res.status(200).json("Liked your post")
        }
        else
        {   
            await post.updateOne({$pull : {likes : req.body.userId}});
            res.status(200).json("Unliked")
        }  
    } catch (error) {
        res.status(505).json(error);
    }
})
// get user post

router.get('/allpost/:username',async (req,res)=>{
    try {

     
        const User = await user.findOne({username : req.params.username});

        const allpost = await Post.find({userId : User._id}) 
        res.status(200).json(allpost)
      
    } catch (error) {
        res.status(505).json(error)
    }
})

router.delete('/:postId/delete/:userId', async (req,res)=>{
    console.log(req.params.userId)
    try {
        const Findpost = await Post.findById(req.params.postId);
        if(Findpost.userId === req.params.userId)
        {
             fs.rm(`./server/images/${Findpost.img}`,(err)=>{
                console.log(err)
            });
            await Post.findByIdAndDelete(req.params.postId);

            res.status(200).json("Post deleted")
        }
        else
        {
            res.status(200).json("Your are not the owner of this post")    
        }
    } catch (error) {
        console.log(error)
    }
})


// get a post 
router.get('/:id',async (req,res)=>{
    try {
        const user = await Post.findById(req.params.id);
        // console.log(user)
        if(user !== undefined)
        {
            res.status(200).json(user);
        }
        else{
            res.status(505).json("User Not Found");
        }
        
    } catch (error) {
        res.status(200).json(error);
    }   
})

// get a timeline
router.get('/timeline/:userId',async (req,res)=>{
    let postArray = []; 
    let friendpost = []; 
    try {
        const currentUser = await user.findById(req.params.userId);
       
        postArray = await Post.find({userId : currentUser._id});
            
        friendpost = await Promise.all(
            currentUser.following.map((friendId)=>{
           return  Post.find({userId : friendId});
            })
        )
      
        //  console.log(postArray)
 
          res.status(200).json(postArray.concat(...friendpost));
    } catch (error) {
        res.status(505).json(postArray.concat(...friendpost))
    }

})
// delete post

 




module.exports = router;