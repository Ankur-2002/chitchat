
import {useState,useEffect, useContext} from 'react';
import {Link} from 'react-router-dom'
import "./post.css"
import PublicIcon from '@material-ui/icons/Public';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import {format} from 'timeago.js'
import axios from 'axios' 
import { Context } from '../../Context/Context';
import $ from 'jquery'
const Post =({data}) =>{ 
    
    const [option ,setoption] = useState(false);
    const {user} = useContext(Context);
    const [info , setinfo] = useState({});
    const [like,setlike] = useState(false);
    const [totallikes , settotallikes] = useState(data.likes.length)
    useEffect(()=>{
        setlike(!data.likes.includes(user._id)); 
    },[data.likes,user._id]);
    useEffect(()=>{
        const fetch_data = async () =>{
            const update = await axios.get(`/api/user/get/?userId=${data.userId}`);
            setinfo(update.data); 
        }
        fetch_data();
    },[data.userId]) 
    
    const Delete = async() =>{
        // console.log(data._id)
        try {
            await axios.delete(`/api/post/${data._id}/delete/${user._id}`);                
            if(!option){
                setoption(true)
            }
            else
            {
                setoption(false)
            }
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
       
    }
    const Likehandler = async () =>{ 
        try {
             await axios.put(`/api/post/${data._id}/like`,{userId : user._id}); 
             if(like){
             settotallikes(totallikes+1)
             setlike(false);
                }
             else{
             settotallikes(totallikes-1)
                setlike(true)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const Showuser = () =>{  
            if(!option) { 
            setoption(true)    
            }
            else{ 
            setoption(false)
            }
    }
    

    return (
        <div className="post">
            <div className="postwrapper">
                <div className="topposts">
                <div className="recommed">
                    <span>Recommended post</span>
                </div>
                <div className="posttop">
                    <div className="posttopleft">
                        
                        <Link to={`/profile/${info.username}`}>
                        <img alt="sorry" className="posttopleftprofile"    src={(data.profile) ? process.env.PUBLIC_URL+data.profile :  process.env.PUBLIC_URL+"/assets/profile/a.jpg"} />
                        </Link>
                        
                        <div className="postleftnames">
                        <span className="imgright">{info.username}</span>
                        <span className="postdate">{format(data.createdAt)} <PublicIcon className="publicIcon"/></span>
                        </div>
                    </div>
                    
                    <div className="posttopright">
                    <MoreHorizIcon className="verticalicon" id="verticalicon" onClick={Showuser}/>
                    <div className="optionsforpost" >
                        <ul className="ulforpost" style={{display : (!option) ? "none" : "block"}}>
                            <li onClick={Delete}>Delete</li>
                            <li onClick={Showuser}><Link to={`/profile/${info.username}`} >Profile</Link></li>
                            <li onClick={Showuser}>Get</li>
                            <li onClick={Showuser}>Check</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            <div className="description"> 
            {/* now we did'n apply any css here */}
            <span>{data.desc}</span>
            </div>
        
            <div className="postcenter">
            {
            <img alt="sorry" className="centerimg" src={`http://localhost:3000/images/${data.img}`}></img>
            }
            </div>
            <div className="postbottom">    
            <div className="likes">
            <div className="first_section" >
            <img alt="sorry"  className="likeimg"  src= {process.env.PUBLIC_URL+"/assets/icons/likes.png"}></img>
            {/* <span>{data.likes.length}</span> */}
            <span>{totallikes}</span>
            </div>
            <>
            <span className="comment_likes_shares">
                53K comments 50K shares
            </span>
            </>
            </div>
            <hr className="hrTag"/>
            <div className="allsection">
            <div className="iconbottom" onClick={Likehandler}>
            <ThumbUpAltIcon />
            <span>Like</span>
            </div>
            <div className="iconbottom">
            <ChatBubbleOutlineOutlinedIcon />
            <span>Comment</span>
            </div> 
            <div className="iconbottom">
            <img alt="sorry" width="22" height="22" src={process.env.PUBLIC_URL+"/assets/icons/share.png"} ></img>    
            <span>Share</span>
            </div>
            
            </div>
            </div>
            </div> 
        </div>
    )
}

export default Post ;

